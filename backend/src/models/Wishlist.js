import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tourPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  },
  { timestamps: true }
);

wishlistSchema.index({ user: 1, tourPackage: 1 });

export default mongoose.model('Wishlist', wishlistSchema);
