import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ['Percentage', 'Fixed'], default: 'Percentage' },
    value: { type: Number, required: true },
    minBookingAmount: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number, default: 1000 },
    validUntil: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 },
    maxUsage: { type: Number, default: 1000 },
  },
  { timestamps: true }
);

export default mongoose.model('Coupon', couponSchema);
