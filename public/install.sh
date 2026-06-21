#!/usr/bin/env bash
# Coreling v2 installer — Mac & Linux
# Replaces the v1 PyInstaller binary; keeps ~/.coreling/artifacts and corelingd.
set -euo pipefail

VERSION="${CORELING_VERSION:-2.0.0}"
REPO="${CORELING_GITHUB_REPO:-frien-frozen/corelingpy}"
C_DIR="${HOME}/.coreling"
APP_DIR="${C_DIR}/app"
ARCHIVE="coreling-v${VERSION}.tar.gz"
URL="https://github.com/${REPO}/releases/download/v${VERSION}/${ARCHIVE}"

GN='\033[92m'
CY='\033[96m'
RD='\033[91m'
DM='\033[90m'
R='\033[0m'

need_node() {
  echo -e "${RD}Coreling v2 requires Node.js 22 or newer.${R}"
  echo -e "${DM}Install from https://nodejs.org then re-run this script.${R}"
  exit 1
}

if ! command -v node >/dev/null 2>&1; then
  need_node
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "${NODE_MAJOR}" -lt 22 ] 2>/dev/null; then
  need_node
fi

mkdir -p "${APP_DIR}"

echo -e "${CY}⚡ Installing Coreling v${VERSION}...${R}"
TMP="$(mktemp -d)"
trap 'rm -rf "${TMP}"' EXIT

echo -e "${DM}Downloading release…${R}"
if command -v curl >/dev/null 2>&1; then
  if ! curl -fL --progress-bar "${URL}" -o "${TMP}/${ARCHIVE}"; then
    echo -e "\n${RD}Download failed.${R}"
    echo -e "${DM}Expected release asset:${R} ${URL}"
    exit 1
  fi
  echo ""
elif command -v wget >/dev/null 2>&1; then
  if ! wget -q --show-progress -O "${TMP}/${ARCHIVE}" "${URL}"; then
    echo -e "${RD}Download failed.${R}"
    exit 1
  fi
else
  echo -e "${RD}Need curl or wget to download Coreling.${R}"
  exit 1
fi

echo -e "${DM}Extracting…${R}"
tar -xzf "${TMP}/${ARCHIVE}" -C "${TMP}"
EXTRACTED="${TMP}/coreling-v${VERSION}"
if [ ! -d "${EXTRACTED}" ]; then
  echo -e "${RD}Unexpected archive layout.${R}"
  exit 1
fi
cp -R "${EXTRACTED}/." "${APP_DIR}/"
chmod +x "${APP_DIR}/bin/coreling"
echo -e "${GN}✓ Coreling app files installed${R}"

if [ ! -d "${APP_DIR}/node_modules" ]; then
  echo -e "${DM}Installing runtime dependencies (this may take a minute)…${R}"
  (cd "${APP_DIR}" && npm install --omit=dev --no-audit --no-fund --ignore-scripts)
  echo -e "${GN}✓ Dependencies ready${R}"
fi

# `coreling` on PATH — replaces old v1 binary at the same path
ln -sf "${APP_DIR}/bin/coreling" "${C_DIR}/coreling"

if [[ ":${PATH}:" != *":${C_DIR}:"* ]]; then
  SHELL_RC=""
  if [ -n "${ZSH_VERSION:-}" ] || [ -f "${HOME}/.zshrc" ]; then
    SHELL_RC="${HOME}/.zshrc"
  elif [ -n "${BASH_VERSION:-}" ] || [ -f "${HOME}/.bashrc" ]; then
    SHELL_RC="${HOME}/.bashrc"
  fi
  if [ -n "${SHELL_RC}" ]; then
    echo "export PATH=\"\$PATH:${C_DIR}\"" >> "${SHELL_RC}"
    echo -e "${GN}⚡ Coreling v${VERSION} installed.${R}"
    echo -e "${DM}Restart your terminal, then run: coreling${R}"
  else
    echo -e "${DM}Add ${C_DIR} to your PATH, then run: coreling${R}"
  fi
else
  echo -e "${GN}⚡ Coreling v${VERSION} installed. Run: coreling${R}"
fi

echo -e "${DM}Local models (Spark · Chat · Pro) download on first use via /model.${R}"

CLOUD_ENV="${C_DIR}/cloud.env"
if [ ! -f "${CLOUD_ENV}" ]; then
  echo ""
  echo -e "${CY}Coreling Cloud (optional) — free models via OpenRouter${R}"
  echo -e "${DM}Get a key at https://openrouter.ai/keys${R}"
  echo -e "${DM}Press Enter to skip and set later in ~/.coreling/cloud.env${R}"
  read -rsp "OpenRouter API key: " OR_KEY
  echo ""
  if [ -n "${OR_KEY}" ]; then
    printf 'CORELING_OPENROUTER_KEY=%s\n' "${OR_KEY}" > "${CLOUD_ENV}"
    chmod 600 "${CLOUD_ENV}"
    echo -e "${GN}Cloud key saved to ~/.coreling/cloud.env${R}"
  fi
fi
