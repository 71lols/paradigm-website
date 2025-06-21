// backend/src/routes/activityRoutes.ts
import { Router, Request, Response } from 'express';
import firebaseAdmin from '../config/firebase';
import { ActivitySession, CreateActivityData, UpdateActivityData } from '../types/activity';
import { verifyToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/activities - Get all activities for user
router.get('/', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ success: false, error: 'User not authenticated' });
      return;
    }

    // Get activities for the user (temporarily without orderBy to avoid index requirement)
    // TODO: Once Firestore index is created, change back to:
    // const activitiesRef = firebaseAdmin.firestore.collection('activities').where('userId', '==', userId);
    // const activitiesSnapshot = await activitiesRef.orderBy('createdAt', 'desc').get();
    const activitiesRef = firebaseAdmin.firestore.collection('activities').where('userId', '==', userId);
    const activitiesSnapshot = await activitiesRef.get();
    
    const activities: ActivitySession[] = [];
    activitiesSnapshot.forEach((doc: any) => {
      activities.push({
        id: doc.id,
        ...doc.data()
      } as ActivitySession);
    });

    // Sort activities by createdAt in descending order on the server side
    activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      data: activities
    });

  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch activities'
    });
  }
});

// POST /api/activities - Create new activity
router.post('/', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ success: false, error: 'User not authenticated' });
      return;
    }

    const body: CreateActivityData = req.body;

    // Validate required fields
    if (!body.title || !body.description || !body.type) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: title, description, and type are required'
      });
      return;
    }

    const now = new Date().toISOString();
    const activityData: Omit<ActivitySession, 'id'> = {
      ...body,
      userId,
      status: body.transcript ? 'completed' : 'processing',
      isStarred: false,
      timestamp: now,
      createdAt: now,
      updatedAt: now,
    };

    // Create the activity
    const docRef = await firebaseAdmin.firestore.collection('activities').add(activityData);
    const newActivity: ActivitySession = {
      id: docRef.id,
      ...activityData
    };

    res.status(201).json({
      success: true,
      data: newActivity
    });

  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create activity'
    });
  }
});

// GET /api/activities/:id - Get specific activity
router.get('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ success: false, error: 'User not authenticated' });
      return;
    }

    const { id } = req.params;

    // Get the activity
    const activityDoc = await firebaseAdmin.firestore.collection('activities').doc(id).get();
    
    if (!activityDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
      return;
    }

    const activityData = activityDoc.data() as Omit<ActivitySession, 'id'>;
    
    // Check if the activity belongs to the user
    if (activityData.userId !== userId) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized access to this activity'
      });
      return;
    }

    const activity: ActivitySession = {
      id: activityDoc.id,
      ...activityData
    };

    res.json({
      success: true,
      data: activity
    });

  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activity'
    });
  }
});

// PATCH /api/activities/:id - Update activity
router.patch('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ success: false, error: 'User not authenticated' });
      return;
    }

    const { id } = req.params;
    const updateData: UpdateActivityData = req.body;

    // Get the activity first to check ownership
    const activityDoc = await firebaseAdmin.firestore.collection('activities').doc(id).get();
    
    if (!activityDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
      return;
    }

    const activityData = activityDoc.data() as Omit<ActivitySession, 'id'>;
    
    // Check if the activity belongs to the user
    if (activityData.userId !== userId) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized access to this activity'
      });
      return;
    }

    // Update the activity
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    await firebaseAdmin.firestore.collection('activities').doc(id).update(updatedData);

    // Get the updated activity
    const updatedDoc = await firebaseAdmin.firestore.collection('activities').doc(id).get();
    const updatedActivity: ActivitySession = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    } as ActivitySession;

    res.json({
      success: true,
      data: updatedActivity
    });

  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update activity'
    });
  }
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ success: false, error: 'User not authenticated' });
      return;
    }

    const { id } = req.params;

    // Get the activity first to check ownership
    const activityDoc = await firebaseAdmin.firestore.collection('activities').doc(id).get();
    
    if (!activityDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
      return;
    }

    const activityData = activityDoc.data() as Omit<ActivitySession, 'id'>;
    
    // Check if the activity belongs to the user
    if (activityData.userId !== userId) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized access to this activity'
      });
      return;
    }

    // Delete the activity
    await firebaseAdmin.firestore.collection('activities').doc(id).delete();

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete activity'
    });
  }
});

// PATCH /api/activities/:id/star - Toggle star status
router.patch('/:id/star', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ success: false, error: 'User not authenticated' });
      return;
    }

    const { id } = req.params;

    // Get the activity first to check ownership and current star status
    const activityDoc = await firebaseAdmin.firestore.collection('activities').doc(id).get();
    
    if (!activityDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
      return;
    }

    const activityData = activityDoc.data() as Omit<ActivitySession, 'id'>;
    
    // Check if the activity belongs to the user
    if (activityData.userId !== userId) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized access to this activity'
      });
      return;
    }

    // Toggle the star status
    const newStarStatus = !activityData.isStarred;
    
    await firebaseAdmin.firestore.collection('activities').doc(id).update({
      isStarred: newStarStatus,
      updatedAt: new Date().toISOString()
    });

    // Get the updated activity
    const updatedDoc = await firebaseAdmin.firestore.collection('activities').doc(id).get();
    const updatedActivity: ActivitySession = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    } as ActivitySession;

    res.json({
      success: true,
      data: updatedActivity
    });

  } catch (error) {
    console.error('Error toggling star:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle star'
    });
  }
});

export default router;