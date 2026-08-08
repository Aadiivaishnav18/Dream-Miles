import express from 'express';
import {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/', protect, authorize('Admin', 'SuperAdmin'), createDestination);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updateDestination);
router.delete('/:id', protect, authorize('Admin', 'SuperAdmin'), deleteDestination);

export default router;
