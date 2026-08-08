import express from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/', protect, authorize('Admin', 'SuperAdmin'), createBlogPost);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updateBlogPost);
router.delete('/:id', protect, authorize('Admin', 'SuperAdmin'), deleteBlogPost);

export default router;
