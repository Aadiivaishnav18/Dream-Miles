import express from 'express';
import {
  getPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/:slug', getPackageBySlug);
router.post('/', protect, authorize('Admin', 'SuperAdmin'), createPackage);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updatePackage);
router.delete('/:id', protect, authorize('Admin', 'SuperAdmin'), deletePackage);

export default router;
