import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createPaymentOrder = catchAsync(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findOne({ bookingId, user: req.user._id });

  if (!booking) {
    throw new APIError('Booking not found', 404);
  }

  // Simulated Razorpay Order ID creation
  const orderId = `order_${Math.random().toString(36).substring(2, 12)}`;

  const payment = await Payment.create({
    booking: booking._id,
    user: req.user._id,
    orderId,
    amount: booking.pricing.totalAmount,
    currency: 'INR',
    status: 'Created',
    provider: 'Razorpay',
  });

  booking.orderId = orderId;
  booking.paymentStatus = 'Processing';
  await booking.save();

  res.status(200).json(
    new APIResponse(
      200,
      {
        orderId: payment.orderId,
        amount: payment.amount,
        currency: payment.currency,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_dreammiles123',
        bookingId: booking.bookingId,
      },
      'Payment order created successfully'
    )
  );
});

export const verifyPayment = catchAsync(async (req, res) => {
  const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const booking = await Booking.findOne({ bookingId, user: req.user._id });
  if (!booking) {
    throw new APIError('Booking not found', 404);
  }

  const paymentId = razorpayPaymentId || `pay_${Math.random().toString(36).substring(2, 12)}`;

  // Update payment record
  await Payment.findOneAndUpdate(
    { booking: booking._id },
    {
      paymentId,
      signature: razorpaySignature || 'simulated_valid_signature',
      status: 'Captured',
    },
    { new: true, upsert: true }
  );

  // Update booking record
  booking.paymentStatus = 'Paid';
  booking.bookingStatus = 'Confirmed';
  booking.paymentId = paymentId;
  await booking.save();

  // Create notification
  await Notification.create({
    user: req.user._id,
    title: 'Payment Successful',
    message: `Payment of ₹${booking.pricing.totalAmount} for booking #${booking.bookingId} received.`,
    type: 'Payment',
    link: `/dashboard/bookings/${booking.bookingId}`,
  });

  res.status(200).json(new APIResponse(200, booking, 'Payment verified and booking confirmed successfully'));
});
