// src/routes/downloadRoutes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Windows installer download
router.get('/installer', (req: Request, res: Response): void => {
  try {
    const blobUrl = process.env.INSTALLER_BLOB_URL_WINDOWS;
    
    if (!blobUrl) {
      res.status(500).json({ error: 'Windows installer not available' });
      return;
    }

    res.setHeader('Content-Disposition', 'attachment; filename="ParadigmSetup-1.0.0.exe"');
    res.redirect(blobUrl);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mac Intel installer download
router.get('/installer/mac', (req: Request, res: Response): void => {
  try {
    const blobUrl = process.env.INSTALLER_BLOB_URL_MAC_INTEL;
    
    if (!blobUrl) {
      res.status(500).json({ error: 'Mac installer not available' });
      return;
    }

    res.setHeader('Content-Disposition', 'attachment; filename="Paradigm-1.0.0.dmg"');
    res.redirect(blobUrl);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mac Apple Silicon installer download
router.get('/installer/mac-silicon', (req: Request, res: Response): void => {
  try {
    const blobUrl = process.env.INSTALLER_BLOB_URL_MAC_ARM64;
    
    if (!blobUrl) {
      res.status(500).json({ error: 'Mac Apple Silicon installer not available' });
      return;
    }

    res.setHeader('Content-Disposition', 'attachment; filename="Paradigm-1.0.0-arm64.dmg"');
    res.redirect(blobUrl);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Auto-detect platform and redirect
router.get('/installer/auto', (req: Request, res: Response): void => {
  try {
    const userAgent = req.headers['user-agent'] || '';
    
    if (userAgent.includes('Mac')) {
      // For now, default to Intel Mac - could add more sophisticated detection
      const blobUrl = process.env.INSTALLER_BLOB_URL_MAC_INTEL;
      if (blobUrl) {
        res.setHeader('Content-Disposition', 'attachment; filename="Paradigm-1.0.0.dmg"');
        res.redirect(blobUrl);
        return;
      }
    } else if (userAgent.includes('Windows')) {
      const blobUrl = process.env.INSTALLER_BLOB_URL_WINDOWS;
      if (blobUrl) {
        res.setHeader('Content-Disposition', 'attachment; filename="ParadigmSetup-1.0.0.exe"');
        res.redirect(blobUrl);
        return;
      }
    }
    
    // Default to Windows if can't detect
    const blobUrl = process.env.INSTALLER_BLOB_URL_WINDOWS;
    if (blobUrl) {
      res.setHeader('Content-Disposition', 'attachment; filename="ParadigmSetup-1.0.0.exe"');
      res.redirect(blobUrl);
    } else {
      res.status(500).json({ error: 'No installer available' });
    }

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all download URLs
router.get('/installer-urls', (req: Request, res: Response): void => {
  try {
    res.json({
      windows: process.env.INSTALLER_BLOB_URL_WINDOWS,
      macIntel: process.env.INSTALLER_BLOB_URL_MAC_INTEL,
      macSilicon: process.env.INSTALLER_BLOB_URL_MAC_ARM64
    });
  } catch (error) {
    console.error('URL generation error:', error);
    res.status(500).json({ error: 'Failed to generate download URLs' });
  }
});

export default router;