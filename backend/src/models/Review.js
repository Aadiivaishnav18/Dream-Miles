import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String },
    tourPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    images: [{ type: String }],
    travelDate: { type: String },
    isApproved: { type: Boolean, default: true },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

reviewSchema.index({ tourPackage: 1, user: 1, isApproved: 1 });

export default mongoose.model('Review', reviewSchema);
