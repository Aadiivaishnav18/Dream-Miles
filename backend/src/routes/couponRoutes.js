import express from 'express';
import {
  validateCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '../controllers/couponController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/validate', validateCoupon);
router.get('/', protect, authorize('Admin', 'SuperAdmin'), getCoupons);
router.post('/', protect, authorize('Admin', 'SuperAdmin'), createCoupon);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updateCoupon);
router.delete('/:id', protect, authorize('Admin', 'SuperAdmin'), deleteCoupon);

export default router;
