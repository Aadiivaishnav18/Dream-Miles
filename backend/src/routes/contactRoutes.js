import express from 'express';
import { submitContactMessage, getContactMessages } from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', protect, authorize('Admin', 'SuperAdmin'), getContactMessages);

export default router;
