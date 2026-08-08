import Coupon from '../models/Coupon.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validateCoupon = catchAsync(async (req, res) => {
  const { code, amount } = req.body;
  if (!code) throw new APIError('Please provide a coupon code', 400);

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
    validUntil: { $gte: new Date() },
  });

  if (!coupon) {
    throw new APIError('Invalid or expired coupon code', 404);
  }

  if (amount && amount < coupon.minBookingAmount) {
    throw new APIError(`Coupon requires minimum booking amount of ₹${coupon.minBookingAmount}`, 400);
  }

  let discount = 0;
  if (coupon.discountType === 'Percentage') {
    discount = Math.min(((amount || 1000) * coupon.value) / 100, coupon.maxDiscountAmount);
  } else {
    discount = Math.min(coupon.value, amount || 1000);
  }

  res.status(200).json(
    new APIResponse(
      200,
      {
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value,
        calculatedDiscount: discount,
      },
      'Coupon is valid!'
    )
  );
});

export const getCoupons = catchAsync(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.status(200).json(new APIResponse(200, coupons, 'Coupons fetched'));
});

export const createCoupon = catchAsync(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(new APIResponse(201, coupon, 'Coupon created successfully'));
});

export const updateCoupon = catchAsync(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!coupon) throw new APIError('Coupon not found', 404);
  res.status(200).json(new APIResponse(200, coupon, 'Coupon updated'));
});

export const deleteCoupon = catchAsync(async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) throw new APIError('Coupon not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Coupon deleted'));
});
