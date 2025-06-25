// src/routes/downloadRoutes.ts
import { Router, Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

const router = Router();

// Download installer endpoint - serves local file
router.get('/installer', (req: Request, res: Response): void => {
  try {
    // Path to your installer file
    const installerPath = path.join(__dirname, '../../installer/ParadigmSetup-1.0.0.exe');
    
    // Check if file exists
    if (!fs.existsSync(installerPath)) {
      res.status(404).json({ error: 'Installer not found' });
      return;
    }

    // Get file stats
    const stats = fs.statSync(installerPath);
    const fileName = 'ParadigmSetup-1.0.0.exe'; // Custom download name
    
    // Set headers
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', stats.size);

    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(installerPath);
    
    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Download failed' });
      }
    });

    fileStream.pipe(res);

  } catch (error) {
    console.error('Download error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;