import Destination from '../models/Destination.js';
import TourPackage from '../models/TourPackage.js';
import Hotel from '../models/Hotel.js';
import Activity from '../models/Activity.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';
import { createSlug } from '../utils/slugify.js';

export const getDestinations = catchAsync(async (req, res) => {
  const { search, category, featured, country } = req.query;
  const query = {};

  if (category) query.categoryTag = category;
  if (featured === 'true') query.isFeatured = true;
  if (country) query.countryName = { $regex: country, $options: 'i' };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { countryName: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
    ];
  }

  const destinations = await Destination.find(query).populate('country', 'name flag code').sort({ rating: -1 });
  res.status(200).json(new APIResponse(200, destinations, 'Destinations fetched successfully'));
});

export const getDestinationBySlug = catchAsync(async (req, res) => {
  const destination = await Destination.findOne({ slug: req.params.slug }).populate('country');
  if (!destination) {
    throw new APIError('Destination not found', 404);
  }

  const packages = await TourPackage.find({ destination: destination._id });
  const hotels = await Hotel.find({ destination: destination._id });
  const activities = await Activity.find({ destination: destination._id });

  res.status(200).json(
    new APIResponse(
      200,
      {
        destination,
        packages,
        hotels,
        activities,
      },
      'Destination details fetched successfully'
    )
  );
});

export const createDestination = catchAsync(async (req, res) => {
  const { name } = req.body;
  const slug = createSlug(name);
  const destination = await Destination.create({ ...req.body, slug });
  res.status(201).json(new APIResponse(201, destination, 'Destination created successfully'));
});

export const updateDestination = catchAsync(async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!destination) throw new APIError('Destination not found', 404);
  res.status(200).json(new APIResponse(200, destination, 'Destination updated successfully'));
});

export const deleteDestination = catchAsync(async (req, res) => {
  const destination = await Destination.findByIdAndDelete(req.params.id);
  if (!destination) throw new APIError('Destination not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Destination deleted successfully'));
});
