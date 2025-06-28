// scripts/uploadAllInstallers.js
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const installers = [
  {
    file: 'Paradigm-1.0.0.dmg',
    platform: 'Mac Intel',
    envVar: 'INSTALLER_BLOB_URL_MAC_INTEL'
  },
  {
    file: 'Paradigm-1.0.0-arm64.dmg',
    platform: 'Mac Apple Silicon',
    envVar: 'INSTALLER_BLOB_URL_MAC_ARM64'
  }
];

async function uploadAllInstallers() {
  console.log('🚀 Uploading all installers to Vercel Blob...\n');

  for (const installer of installers) {
    try {
      // Path to installer file
      const installerPath = path.join(process.cwd(), 'installer', installer.file);
      
      // Check if file exists
      if (!fs.existsSync(installerPath)) {
        console.error(`❌ ${installer.platform} installer not found at: ${installerPath}`);
        continue;
      }

      console.log(`📦 Uploading ${installer.platform} installer...`);
      
      // Read the file
      const fileBuffer = fs.readFileSync(installerPath);
      
      // Upload to Vercel Blob
      const blob = await put(installer.file, fileBuffer, {
        access: 'public',
        contentType: 'application/octet-stream',
      });

      console.log(`✅ ${installer.platform} installer uploaded successfully!`);
      console.log(`📁 Blob URL: ${blob.url}`);
      console.log(`💡 Environment variable: ${installer.envVar}=${blob.url}\n`);
      
    } catch (error) {
      console.error(`❌ ${installer.platform} upload failed:`, error);
    }
  }

  console.log('🎉 All uploads complete! Add these to your Vercel environment variables:');
}

uploadAllInstallers();