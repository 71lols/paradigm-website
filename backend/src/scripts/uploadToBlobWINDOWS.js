// scripts/uploadAllInstallers.js
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const installers = [
  {
    file: 'ParadigmSetup-1.0.0.exe',  // Fixed: This matches your package.json artifactName
    platform: 'Windows',
    envVar: 'INSTALLER_BLOB_URL_WINDOWS'  // Fixed: Should be WINDOWS, not MAC_INTEL
  }
];

async function uploadAllInstallers() {
  console.log('🚀 Uploading all installers to Vercel Blob...\n');

  for (const installer of installers) {
    try {
      // Path to installer file - in backend/installer/ folder
      const installerPath = path.join(process.cwd(), 'installer', installer.file);
      
      // Check if file exists
      if (!fs.existsSync(installerPath)) {
        console.error(`❌ ${installer.platform} installer not found at: ${installerPath}`);
        
        // Let's also check what files are actually in the backend/installer folder
        const installerDir = path.join(process.cwd(), 'installer');
        if (fs.existsSync(installerDir)) {
          console.log('📁 Files in backend/installer folder:');
          const files = fs.readdirSync(installerDir);
          files.forEach(file => console.log(`   - ${file}`));
        } else {
          console.log('❌ backend/installer folder does not exist');
        }
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