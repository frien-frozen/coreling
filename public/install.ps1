# Coreling v2 installer — Windows
# Replaces v1 coreling.exe; keeps %USERPROFILE%\.coreling\artifacts and corelingd.
$ErrorActionPreference = "Stop"

$Version = if ($env:CORELING_VERSION) { $env:CORELING_VERSION } else { "2.0.0" }
$Repo = if ($env:CORELING_GITHUB_REPO) { $env:CORELING_GITHUB_REPO } else { "frien-frozen/corelingpy" }
$CDir = Join-Path $env:USERPROFILE ".coreling"
$AppDir = Join-Path $CDir "app"
$Archive = "coreling-v$Version.tar.gz"
$Url = "https://github.com/$Repo/releases/download/v$Version/$Archive"

function Require-Node {
    Write-Host "Coreling v2 requires Node.js 22 or newer." -ForegroundColor Red
    Write-Host "Install from https://nodejs.org then re-run this script." -ForegroundColor DarkGray
    exit 1
}

function Write-DownloadProgress {
    param(
        [long]$BytesRead,
        [long]$TotalBytes
    )
    if ($TotalBytes -le 0) {
        Write-Host "`rDownloading... $([math]::Round($BytesRead / 1MB, 1)) MB" -NoNewline -ForegroundColor DarkGray
        return
    }
    $pct = [math]::Min(100, [math]::Floor(100 * $BytesRead / $TotalBytes))
    $filled = [math]::Floor(40 * $pct / 100)
    $bar = ("█" * $filled) + ("░" * (40 - $filled))
    Write-Host "`r[$bar] $pct% " -NoNewline -ForegroundColor Cyan
}

function Download-Release {
    param(
        [string]$Uri,
        [string]$Destination
    )
    if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
        Write-Host "Downloading Coreling v$Version..." -ForegroundColor Cyan
        & curl.exe -# -fsSL $Uri -o $Destination
        Write-Host ""
        return
    }

    Write-Host "Downloading Coreling v$Version..." -ForegroundColor Cyan
    $request = [System.Net.HttpWebRequest]::Create($Uri)
    $request.UserAgent = "Coreling-Installer"
    $response = $request.GetResponse()
    $total = $response.ContentLength
    $stream = $response.GetResponseStream()
    $fileStream = [System.IO.File]::Create($Destination)
    try {
        $buffer = New-Object byte[] 65536
        $read = 0L
        while (($n = $stream.Read($buffer, 0, $buffer.Length)) -gt 0) {
            $fileStream.Write($buffer, 0, $n)
            $read += $n
            Write-DownloadProgress -BytesRead $read -TotalBytes $total
        }
    } finally {
        $fileStream.Close()
        $stream.Close()
        $response.Close()
    }
    Write-Host ""
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Require-Node }
$nodeMajor = [int](node -p "process.versions.node.split('.')[0]")
if ($nodeMajor -lt 22) { Require-Node }

New-Item -ItemType Directory -Force -Path $AppDir | Out-Null

Write-Host "Installing Coreling v$Version..." -ForegroundColor Cyan
$Tmp = Join-Path $env:TEMP "coreling-install-$([guid]::NewGuid().ToString('n'))"
New-Item -ItemType Directory -Force -Path $Tmp | Out-Null

try {
    $ArchivePath = Join-Path $Tmp $Archive
    Download-Release -Uri $Url -Destination $ArchivePath

    Write-Host "Extracting..." -ForegroundColor DarkGray
    # Unix npm creates symlinks in node_modules/.bin — Windows tar.exe cannot
    # extract them ("Invalid argument"). Skip .bin entirely; bin/coreling runs
    # dist/cli.mjs directly and does not need npm shims.
    Remove-Item -Recurse -Force (Join-Path $Tmp "coreling-v$Version") -ErrorAction SilentlyContinue
    & tar.exe -xzf $ArchivePath -C $Tmp --exclude="*/node_modules/.bin/*"
    if ($LASTEXITCODE -ne 0) {
        Remove-Item -Recurse -Force (Join-Path $Tmp "coreling-v$Version") -ErrorAction SilentlyContinue
        & tar.exe -xzf $ArchivePath -C $Tmp --exclude="node_modules/.bin/*"
    }
    if ($LASTEXITCODE -ne 0) {
        throw "tar failed with exit code $LASTEXITCODE"
    }
    $Extracted = Join-Path $Tmp "coreling-v$Version"
    if (-not (Test-Path $Extracted)) {
        throw "Unexpected archive layout"
    }
    if (Test-Path $AppDir) { Remove-Item -Recurse -Force $AppDir }
    New-Item -ItemType Directory -Force -Path $AppDir | Out-Null
    Copy-Item -Path (Join-Path $Extracted "*") -Destination $AppDir -Recurse -Force
    Write-Host "Coreling app files installed." -ForegroundColor Green

    # Remove any partial/broken .bin left from older tarballs
    Remove-Item -Recurse -Force (Join-Path $AppDir "node_modules\.bin") -ErrorAction SilentlyContinue

    $NodeModules = Join-Path $AppDir "node_modules"
    if (-not (Test-Path $NodeModules)) {
        Write-Host "Installing runtime dependencies (this may take a minute)..." -ForegroundColor DarkGray
        Push-Location $AppDir
        npm install --omit=dev --no-audit --no-fund --ignore-scripts --bin-links=false
        Pop-Location
        Write-Host "Dependencies ready." -ForegroundColor Green
    }
} catch {
    Write-Host "Download or extract failed: $_" -ForegroundColor Red
    Write-Host "Expected release asset: $Url" -ForegroundColor DarkGray
    Write-Host "Publish v$Version to GitHub first (openclaude/scripts/package-release.sh)." -ForegroundColor DarkGray
    exit 1
} finally {
    Remove-Item -Recurse -Force $Tmp -ErrorAction SilentlyContinue
}

# Launcher — typing `coreling` runs the Node CLI
$CmdPath = Join-Path $CDir "coreling.cmd"
@'
@echo off
node "%USERPROFILE%\.coreling\app\bin\coreling" %*
'@ | Set-Content -Path $CmdPath -Encoding ASCII

# Remove legacy v1 PyInstaller exe if present (replaced by .cmd)
$LegacyExe = Join-Path $CDir "coreling.exe"
if (Test-Path $LegacyExe) { Remove-Item -Force $LegacyExe }

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notmatch [regex]::Escape($CDir)) {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$CDir", "User")
    $env:Path = "$env:Path;$CDir"
}

Write-Host "Coreling v$Version installed. Open a new terminal and run: coreling" -ForegroundColor Green
Write-Host "Local models (Spark / Chat / Pro) download on first /model — runtime setup is automatic." -ForegroundColor DarkGray

$CloudEnv = Join-Path $CDir "cloud.env"
if (-not (Test-Path $CloudEnv)) {
    Write-Host ""
    Write-Host "Coreling Cloud (optional) - free models via OpenRouter" -ForegroundColor Cyan
    Write-Host "Get a key at https://openrouter.ai/keys" -ForegroundColor DarkGray
    $OrKey = Read-Host "OpenRouter API key (Enter to skip)"
    if ($OrKey -and $OrKey.Trim()) {
        "CORELING_OPENROUTER_KEY=$($OrKey.Trim())" | Set-Content -Path $CloudEnv -Encoding ASCII
        Write-Host "Cloud key saved to $CloudEnv" -ForegroundColor Green
    }
}
