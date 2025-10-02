#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Preparing Vite for build...');

// Set execute permissions on Unix systems
const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
if (process.platform !== 'win32' && fs.existsSync(vitePath)) {
  try {
    fs.chmodSync(vitePath, '755');
    console.log('✅ Execute permissions set for Vite');
  } catch (error) {
    console.log('⚠️ Could not set permissions, but continuing...');
  }
}

console.log('🚀 Building Guardian Beacon...');

try {
  // Run the build command
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}