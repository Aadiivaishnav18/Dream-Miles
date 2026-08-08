import Country from '../models/Country.js';
import Destination from '../models/Destination.js';
import TourPackage from '../models/TourPackage.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';
import { createSlug } from '../utils/slugify.js';

export const getCountries = catchAsync(async (req, res) => {
  const { continent, search, featured } = req.query;
  const query = {};

  if (continent) query.continent = continent;
  if (featured === 'true') query.isFeatured = true;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { capital: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
    ];
  }

  const countries = await Country.find(query).sort({ name: 1 });
  res.status(200).json(new APIResponse(200, countries, 'Countries fetched successfully'));
});

export const getCountryBySlug = catchAsync(async (req, res) => {
  const country = await Country.findOne({ slug: req.params.slug });
  if (!country) {
    throw new APIError('Country not found', 404);
  }

  const destinations = await Destination.find({ country: country._id });
  const packages = await TourPackage.find({ country: country._id });

  res.status(200).json(
    new APIResponse(
      200,
      {
        country,
        destinations,
        packages,
      },
      'Country details fetched successfully'
    )
  );
});

export const createCountry = catchAsync(async (req, res) => {
  const { name } = req.body;
  const slug = createSlug(name);
  const country = await Country.create({ ...req.body, slug });
  res.status(201).json(new APIResponse(201, country, 'Country created successfully'));
});

export const updateCountry = catchAsync(async (req, res) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!country) throw new APIError('Country not found', 404);
  res.status(200).json(new APIResponse(200, country, 'Country updated successfully'));
});

export const deleteCountry = catchAsync(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);
  if (!country) throw new APIError('Country not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Country deleted successfully'));
});
