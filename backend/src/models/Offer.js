import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String },
    discountText: { type: String, required: true },
    couponCode: { type: String, required: true },
    bgImage: { type: String, required: true },
    link: { type: String, default: '/tours' },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Offer', offerSchema);
