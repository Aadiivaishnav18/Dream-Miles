import express from 'express';
import { getAdminStats, getUsers, updateUserStatus } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect, authorize('Admin', 'SuperAdmin'));

router.get('/stats', getAdminStats);
router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);

export default router;
