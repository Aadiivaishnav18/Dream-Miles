import Review from '../models/Review.js';
import TourPackage from '../models/TourPackage.js';
import Booking from '../models/Booking.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createReview = catchAsync(async (req, res) => {
  const { packageId, rating, title, comment, images } = req.body;

  if (!packageId || !rating || !title || !comment) {
    throw new APIError('Please fill out all review fields', 400);
  }

  const pkg = await TourPackage.findById(packageId);
  if (!pkg) {
    throw new APIError('Package not found', 404);
  }

  // Check if user has booked this package
  const hasBooked = await Booking.findOne({
    user: req.user._id,
    tourPackage: packageId,
  });

  if (!hasBooked && req.user.role !== 'Admin') {
    throw new APIError('You can only review packages you have booked', 403);
  }

  const review = await Review.create({
    user: req.user._id,
    userName: req.user.name,
    userAvatar: req.user.avatar,
    tourPackage: packageId,
    rating: Number(rating),
    title,
    comment,
    images: images || [],
    travelDate: hasBooked?.travelDate || '',
    isApproved: true,
  });

  // Recalculate package average rating
  const reviews = await Review.find({ tourPackage: packageId, isApproved: true });
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  pkg.rating = Number(avgRating);
  pkg.reviewsCount = reviews.length;
  await pkg.save();

  res.status(201).json(new APIResponse(201, review, 'Review submitted successfully'));
});

export const getPackageReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({ tourPackage: req.params.packageId, isApproved: true }).sort({ createdAt: -1 });
  res.status(200).json(new APIResponse(200, reviews, 'Reviews fetched successfully'));
});

export const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find().populate('tourPackage', 'title slug').sort({ createdAt: -1 });
  res.status(200).json(new APIResponse(200, reviews, 'All reviews fetched successfully'));
});

export const approveReview = catchAsync(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
  if (!review) throw new APIError('Review not found', 404);
  res.status(200).json(new APIResponse(200, review, 'Review approved'));
});

export const deleteReview = catchAsync(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw new APIError('Review not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Review deleted'));
});
