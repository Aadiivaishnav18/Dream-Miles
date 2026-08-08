import TourPackage from '../models/TourPackage.js';
import Review from '../models/Review.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';
import { createSlug } from '../utils/slugify.js';

export const getPackages = catchAsync(async (req, res) => {
  const {
    search,
    category,
    country,
    destination,
    minPrice,
    maxPrice,
    days,
    difficulty,
    rating,
    featured,
    trending,
    sort,
    page = 1,
    limit = 12,
  } = req.query;

  const query = {};

  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;
  if (featured === 'true') query.isFeatured = true;
  if (trending === 'true') query.isTrending = true;

  if (minPrice || maxPrice) {
    query.finalPrice = {};
    if (minPrice) query.finalPrice.$gte = Number(minPrice);
    if (maxPrice) query.finalPrice.$lte = Number(maxPrice);
  }

  if (days) {
    query.days = Number(days);
  }

  if (rating) {
    query.rating = { $gte: Number(rating) };
  }

  if (country) {
    query.countryName = { $regex: country, $options: 'i' };
  }

  if (destination) {
    query.destinationName = { $regex: destination, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { destinationName: { $regex: search, $options: 'i' } },
      { countryName: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { overview: { $regex: search, $options: 'i' } },
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'price-asc') sortOption = { finalPrice: 1 };
  if (sort === 'price-desc') sortOption = { finalPrice: -1 };
  if (sort === 'rating') sortOption = { rating: -1 };
  if (sort === 'popularity') sortOption = { reviewsCount: -1, rating: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const packages = await TourPackage.find(query)
    .populate('destination', 'name slug heroImage rating')
    .populate('country', 'name flag code')
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const total = await TourPackage.countDocuments(query);

  res.status(200).json(
    new APIResponse(
      200,
      {
        packages,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
          limit: Number(limit),
        },
      },
      'Packages fetched successfully'
    )
  );
});

export const getPackageBySlug = catchAsync(async (req, res) => {
  const pkg = await TourPackage.findOne({ slug: req.params.slug })
    .populate('destination')
    .populate('country');

  if (!pkg) {
    throw new APIError('Package not found', 404);
  }

  const reviews = await Review.find({ tourPackage: pkg._id, isApproved: true }).sort({ createdAt: -1 });
  const similarPackages = await TourPackage.find({
    _id: { $ne: pkg._id },
    category: pkg.category,
  }).limit(4);

  res.status(200).json(
    new APIResponse(
      200,
      {
        package: pkg,
        reviews,
        similarPackages,
      },
      'Package details fetched successfully'
    )
  );
});

export const createPackage = catchAsync(async (req, res) => {
  const { title, price, discountPercentage = 0 } = req.body;
  const slug = createSlug(title);
  const finalPrice = Math.round(price - price * (discountPercentage / 100));

  const pkg = await TourPackage.create({
    ...req.body,
    slug,
    finalPrice,
  });

  res.status(201).json(new APIResponse(201, pkg, 'Tour package created successfully'));
});

export const updatePackage = catchAsync(async (req, res) => {
  if (req.body.price !== undefined || req.body.discountPercentage !== undefined) {
    const existing = await TourPackage.findById(req.params.id);
    if (existing) {
      const price = req.body.price !== undefined ? req.body.price : existing.price;
      const discount = req.body.discountPercentage !== undefined ? req.body.discountPercentage : existing.discountPercentage;
      req.body.finalPrice = Math.round(price - price * (discount / 100));
    }
  }

  const pkg = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!pkg) throw new APIError('Package not found', 404);
  res.status(200).json(new APIResponse(200, pkg, 'Tour package updated successfully'));
});

export const deletePackage = catchAsync(async (req, res) => {
  const pkg = await TourPackage.findByIdAndDelete(req.params.id);
  if (!pkg) throw new APIError('Package not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Tour package deleted successfully'));
});
