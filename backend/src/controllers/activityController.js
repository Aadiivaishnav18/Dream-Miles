import Activity from '../models/Activity.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';
import { createSlug } from '../utils/slugify.js';

export const getActivities = catchAsync(async (req, res) => {
  const { search, difficulty, featured } = req.query;
  const query = {};

  if (difficulty) query.difficulty = difficulty;
  if (featured === 'true') query.isFeatured = true;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const activities = await Activity.find(query).populate('destination').sort({ rating: -1 });
  res.status(200).json(new APIResponse(200, activities, 'Activities fetched successfully'));
});

export const getActivityBySlug = catchAsync(async (req, res) => {
  const activity = await Activity.findOne({ slug: req.params.slug }).populate('destination');
  if (!activity) throw new APIError('Activity not found', 404);
  res.status(200).json(new APIResponse(200, activity, 'Activity details fetched successfully'));
});

export const createActivity = catchAsync(async (req, res) => {
  const slug = createSlug(req.body.title);
  const activity = await Activity.create({ ...req.body, slug });
  res.status(201).json(new APIResponse(201, activity, 'Activity created successfully'));
});

export const updateActivity = catchAsync(async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!activity) throw new APIError('Activity not found', 404);
  res.status(200).json(new APIResponse(200, activity, 'Activity updated successfully'));
});

export const deleteActivity = catchAsync(async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) throw new APIError('Activity not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Activity deleted successfully'));
});
