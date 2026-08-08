import Booking from '../models/Booking.js';
import TourPackage from '../models/TourPackage.js';
import Notification from '../models/Notification.js';
import Coupon from '../models/Coupon.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createBooking = catchAsync(async (req, res) => {
  const {
    packageId,
    travelDate,
    travelers, // { adults, children, infants }
    travelerDetails, // array of traveler info
    couponCode,
    paymentMethod = 'Razorpay',
  } = req.body;

  if (!packageId || !travelDate || !travelers || !travelerDetails || travelerDetails.length === 0) {
    throw new APIError('Please provide all required booking details', 400);
  }

  const pkg = await TourPackage.findById(packageId);
  if (!pkg) {
    throw new APIError('Tour package not found', 404);
  }

  const adults = Number(travelers.adults) || 1;
  const children = Number(travelers.children) || 0;
  const infants = Number(travelers.infants) || 0;

  const adultTotal = pkg.finalPrice * adults;
  const childTotal = (pkg.childPrice || Math.round(pkg.finalPrice * 0.7)) * children;
  const infantTotal = (pkg.infantPrice || Math.round(pkg.finalPrice * 0.2)) * infants;

  const subtotal = adultTotal + childTotal + infantTotal;

  let discount = 0;
  if (couponCode) {
    const coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
      validUntil: { $gte: new Date() },
    });

    if (coupon && subtotal >= coupon.minBookingAmount) {
      if (coupon.discountType === 'Percentage') {
        discount = Math.min((subtotal * coupon.value) / 100, coupon.maxDiscountAmount);
      } else {
        discount = Math.min(coupon.value, subtotal);
      }
      coupon.usageCount += 1;
      await coupon.save();
    }
  }

  const tax = Math.round((subtotal - discount) * 0.05); // 5% tax
  const totalAmount = Math.round(subtotal - discount + tax);

  const bookingId = `DM-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const booking = await Booking.create({
    bookingId,
    user: req.user._id,
    tourPackage: pkg._id,
    packageTitle: pkg.title,
    destinationName: pkg.destinationName,
    coverImage: pkg.coverImage,
    travelDate,
    travelers: { adults, children, infants },
    travelerDetails,
    pricing: {
      basePrice: pkg.finalPrice,
      adultTotal,
      childTotal,
      infantTotal,
      addOnsTotal: 0,
      tax,
      discount,
      couponCode: couponCode || '',
      totalAmount,
    },
    paymentStatus: 'Pending',
    bookingStatus: 'Confirmed',
    paymentMethod,
  });

  // Create notification
  await Notification.create({
    user: req.user._id,
    title: 'Booking Confirmed!',
    message: `Your booking #${booking.bookingId} for "${pkg.title}" has been placed successfully.`,
    type: 'Booking',
    link: `/dashboard/bookings/${booking.bookingId}`,
  });

  res.status(201).json(new APIResponse(201, booking, 'Booking created successfully'));
});

export const getUserBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('tourPackage')
    .sort({ createdAt: -1 });

  res.status(200).json(new APIResponse(200, bookings, 'User bookings fetched successfully'));
});

export const getBookingById = catchAsync(async (req, res) => {
  const booking = await Booking.findOne({
    $or: [{ bookingId: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
  })
    .populate('tourPackage')
    .populate('user', 'name email phone');

  if (!booking) {
    throw new APIError('Booking not found', 404);
  }

  // Check authorization
  if (req.user.role !== 'Admin' && req.user.role !== 'SuperAdmin' && booking.user._id.toString() !== req.user._id.toString()) {
    throw new APIError('Not authorized to view this booking', 403);
  }

  res.status(200).json(new APIResponse(200, booking, 'Booking details fetched successfully'));
});

export const cancelBooking = catchAsync(async (req, res) => {
  const { reason } = req.body;
  const booking = await Booking.findOne({ bookingId: req.params.id, user: req.user._id });

  if (!booking) {
    throw new APIError('Booking not found', 404);
  }

  if (booking.bookingStatus === 'Cancelled') {
    throw new APIError('Booking is already cancelled', 400);
  }

  booking.bookingStatus = 'Cancelled';
  booking.cancellationReason = reason || 'Cancelled by user';
  if (booking.paymentStatus === 'Paid') {
    booking.paymentStatus = 'Refunded';
  }
  await booking.save();

  await Notification.create({
    user: req.user._id,
    title: 'Booking Cancelled',
    message: `Your booking #${booking.bookingId} has been cancelled.`,
    type: 'Booking',
    link: `/dashboard/bookings/${booking.bookingId}`,
  });

  res.status(200).json(new APIResponse(200, booking, 'Booking cancelled successfully'));
});

export const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'name email phone')
    .populate('tourPackage', 'title slug price')
    .sort({ createdAt: -1 });

  res.status(200).json(new APIResponse(200, bookings, 'All bookings fetched successfully'));
});

export const updateBookingStatus = catchAsync(async (req, res) => {
  const { bookingStatus, paymentStatus } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new APIError('Booking not found', 404);
  }

  if (bookingStatus) booking.bookingStatus = bookingStatus;
  if (paymentStatus) booking.paymentStatus = paymentStatus;

  await booking.save();
  res.status(200).json(new APIResponse(200, booking, 'Booking status updated successfully'));
});
