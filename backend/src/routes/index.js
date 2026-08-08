import express from 'express';
import authRoutes from './authRoutes.js';
import countryRoutes from './countryRoutes.js';
import destinationRoutes from './destinationRoutes.js';
import packageRoutes from './packageRoutes.js';
import hotelRoutes from './hotelRoutes.js';
import activityRoutes from './activityRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';
import couponRoutes from './couponRoutes.js';
import blogRoutes from './blogRoutes.js';
import contactRoutes from './contactRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/destinations', destinationRoutes);
router.use('/packages', packageRoutes);
router.use('/hotels', hotelRoutes);
router.use('/activities', activityRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/coupons', couponRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);

export default router;
