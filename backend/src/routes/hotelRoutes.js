import express from 'express';
import {
  getHotels,
  getHotelBySlug,
  createHotel,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getHotels);
router.get('/:slug', getHotelBySlug);
router.post('/', protect, authorize('Admin', 'SuperAdmin'), createHotel);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updateHotel);
router.delete('/:id', protect, authorize('Admin', 'SuperAdmin'), deleteHotel);

export default router;
