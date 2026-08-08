import express from 'express';
import {
  getActivities,
  getActivityBySlug,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/:slug', getActivityBySlug);
router.post('/', protect, authorize('Admin', 'SuperAdmin'), createActivity);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updateActivity);
router.delete('/:id', protect, authorize('Admin', 'SuperAdmin'), deleteActivity);

export default router;
