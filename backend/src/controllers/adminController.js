import User from '../models/User.js';
import Booking from '../models/Booking.js';
import TourPackage from '../models/TourPackage.js';
import Destination from '../models/Destination.js';
import Country from '../models/Country.js';
import Review from '../models/Review.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAdminStats = catchAsync(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: 'User' });
  const totalBookings = await Booking.countDocuments();
  const totalPackages = await TourPackage.countDocuments();
  const totalDestinations = await Destination.countDocuments();
  const totalCountries = await Country.countDocuments();
  const totalReviews = await Review.countDocuments();

  const paidBookings = await Booking.find({ paymentStatus: 'Paid' });
  const totalRevenue = paidBookings.reduce((sum, b) => sum + (b.pricing?.totalAmount || 0), 0);

  const recentBookings = await Booking.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(6);

  const popularDestinations = await Destination.find().sort({ popularityScore: -1 }).limit(5);

  res.status(200).json(
    new APIResponse(
      200,
      {
        totalUsers,
        totalBookings,
        totalRevenue,
        totalPackages,
        totalDestinations,
        totalCountries,
        totalReviews,
        recentBookings,
        popularDestinations,
      },
      'Admin statistics fetched successfully'
    )
  );
});

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.status(200).json(new APIResponse(200, users, 'Users fetched successfully'));
});

export const updateUserStatus = catchAsync(async (req, res) => {
  const { isBlocked, role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) throw new APIError('User not found', 404);

  if (isBlocked !== undefined) user.isBlocked = isBlocked;
  if (role) user.role = role;

  await user.save();
  res.status(200).json(new APIResponse(200, user, 'User status updated successfully'));
});
