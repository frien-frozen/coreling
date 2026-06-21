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

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Require-Node }
$nodeMajor = [int](node -p "process.versions.node.split('.')[0]")
if ($nodeMajor -lt 22) { Require-Node }

New-Item -ItemType Directory -Force -Path $AppDir | Out-Null

Write-Host "Installing Coreling v$Version..." -ForegroundColor Cyan
$Tmp = Join-Path $env:TEMP "coreling-install-$([guid]::NewGuid().ToString('n'))"
New-Item -ItemType Directory -Force -Path $Tmp | Out-Null

try {
    $ArchivePath = Join-Path $Tmp $Archive
    Invoke-WebRequest -Uri $Url -OutFile $ArchivePath -UseBasicParsing
    tar -xzf $ArchivePath -C $Tmp
    $Extracted = Join-Path $Tmp "coreling-v$Version"
    if (-not (Test-Path $Extracted)) {
        throw "Unexpected archive layout"
    }
    if (Test-Path $AppDir) { Remove-Item -Recurse -Force $AppDir }
    New-Item -ItemType Directory -Force -Path $AppDir | Out-Null
    Copy-Item -Path (Join-Path $Extracted "*") -Destination $AppDir -Recurse -Force
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
Write-Host "Local models (Spark / Chat / Pro) download on first use via /model." -ForegroundColor DarkGray

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
