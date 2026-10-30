#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
build="$root/.build"
sdk="$build/connector-plugin-sdk"
revision="1f9571b2503c19e685b957da9b489d923c5fbb8a"
mkdir -p "$build" "$root/dist"
if [ ! -d "$sdk/.git" ]; then
  git clone https://github.com/tableau/connector-plugin-sdk.git "$sdk"
fi
git -C "$sdk" checkout --detach "$revision"
python3 -m venv "$build/venv"
"$build/venv/bin/python" -m pip install "$sdk/connector-packager"
cd "$sdk/connector-packager"
"$build/venv/bin/python" -m connector_packager.package "$root" --dest "$root/dist"
