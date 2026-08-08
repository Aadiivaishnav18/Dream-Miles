import express from 'express';
import { toggleWishlist, getUserWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUserWishlist);
router.post('/toggle', protect, toggleWishlist);

export default router;
