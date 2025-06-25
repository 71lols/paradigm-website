// scripts/uploadToBlob.js
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function uploadInstaller() {
  try {
    // Path to your installer file
    const installerPath = path.join(process.cwd(), 'installer/ParadigmSetup-1.0.0.exe');
    
    // Check if file exists
    if (!fs.existsSync(installerPath)) {
      console.error('❌ Installer file not found at:', installerPath);
      process.exit(1);
    }

    console.log('🚀 Uploading installer to Vercel Blob...');
    
    // Read the file
    const fileBuffer = fs.readFileSync(installerPath);
    
    // Upload to Vercel Blob
    const blob = await put('ParadigmSetup-1.0.0.exe', fileBuffer, {
      access: 'public',
      contentType: 'application/octet-stream',
    });

    console.log('✅ Installer uploaded successfully!');
    console.log('📁 Blob URL:', blob.url);
    console.log('💡 Add this to your environment variables:');
    console.log(`INSTALLER_BLOB_URL=${blob.url}`);
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

uploadInstaller();