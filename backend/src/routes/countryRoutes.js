import express from 'express';
import {
  getCountries,
  getCountryBySlug,
  createCountry,
  updateCountry,
  deleteCountry,
} from '../controllers/countryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getCountries);
router.get('/:slug', getCountryBySlug);
router.post('/', protect, authorize('Admin', 'SuperAdmin'), createCountry);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updateCountry);
router.delete('/:id', protect, authorize('Admin', 'SuperAdmin'), deleteCountry);

export default router;
