#!/bin/bash
set -e
echo "Setting execute permissions for Vite..."
chmod +x node_modules/.bin/vite
echo "Running Vite build..."
vite build