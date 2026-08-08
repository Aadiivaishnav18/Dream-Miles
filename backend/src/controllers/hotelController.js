import Hotel from '../models/Hotel.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';
import { createSlug } from '../utils/slugify.js';

export const getHotels = catchAsync(async (req, res) => {
  const { search, starRating, destination, featured } = req.query;
  const query = {};

  if (starRating) query.starRating = Number(starRating);
  if (featured === 'true') query.isFeatured = true;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const hotels = await Hotel.find(query).populate('destination').sort({ rating: -1 });
  res.status(200).json(new APIResponse(200, hotels, 'Hotels fetched successfully'));
});

export const getHotelBySlug = catchAsync(async (req, res) => {
  const hotel = await Hotel.findOne({ slug: req.params.slug }).populate('destination');
  if (!hotel) throw new APIError('Hotel not found', 404);
  res.status(200).json(new APIResponse(200, hotel, 'Hotel details fetched successfully'));
});

export const createHotel = catchAsync(async (req, res) => {
  const slug = createSlug(req.body.name);
  const hotel = await Hotel.create({ ...req.body, slug });
  res.status(201).json(new APIResponse(201, hotel, 'Hotel created successfully'));
});

export const updateHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!hotel) throw new APIError('Hotel not found', 404);
  res.status(200).json(new APIResponse(200, hotel, 'Hotel updated successfully'));
});

export const deleteHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!hotel) throw new APIError('Hotel not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Hotel deleted successfully'));
});
