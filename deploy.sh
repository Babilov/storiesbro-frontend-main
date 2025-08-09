#!/bin/bash
set -e  # если команда упадёт — скрипт завершится

npm run build
git add .
git commit -m "1"
git push