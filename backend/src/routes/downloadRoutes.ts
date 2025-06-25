// src/routes/downloadRoutes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Download installer endpoint - redirects to Vercel Blob
router.get('/installer', (req: Request, res: Response): void => {
  try {
    // Get the blob URL from environment variables
    const blobUrl = process.env.INSTALLER_BLOB_URL;
    
    if (!blobUrl) {
      res.status(500).json({ error: 'Installer not available' });
      return;
    }

    // Redirect to the blob URL with download headers
    res.setHeader('Content-Disposition', 'attachment; filename="ParadigmSetup-1.0.0.exe"');
    res.redirect(blobUrl);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Alternative: Get direct download URL
router.get('/installer-url', (req: Request, res: Response): void => {
  try {
    const blobUrl = process.env.INSTALLER_BLOB_URL;
    
    if (!blobUrl) {
      res.status(500).json({ error: 'Installer not available' });
      return;
    }

    res.json({ downloadUrl: blobUrl });

  } catch (error) {
    console.error('URL generation error:', error);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
});

export default router;