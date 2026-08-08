import express from 'express';
import {
  createReview,
  getPackageReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/package/:packageId', getPackageReviews);
router.post('/', protect, createReview);

// Admin routes
router.get('/admin/all', protect, authorize('Admin', 'SuperAdmin'), getAllReviews);
router.put('/admin/:id/approve', protect, authorize('Admin', 'SuperAdmin'), approveReview);
router.delete('/admin/:id', protect, authorize('Admin', 'SuperAdmin'), deleteReview);

export default router;
