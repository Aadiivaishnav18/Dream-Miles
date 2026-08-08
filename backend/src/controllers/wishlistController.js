import Wishlist from '../models/Wishlist.js';
import User from '../models/User.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

export const toggleWishlist = catchAsync(async (req, res) => {
  const { packageId, destinationId } = req.body;
  const userId = req.user._id;

  if (packageId) {
    const existing = await Wishlist.findOne({ user: userId, tourPackage: packageId });
    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      await User.findByIdAndUpdate(userId, { $pull: { wishlist: packageId } });
      return res.status(200).json(new APIResponse(200, { inWishlist: false }, 'Removed from wishlist'));
    } else {
      await Wishlist.create({ user: userId, tourPackage: packageId });
      await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: packageId } });
      return res.status(200).json(new APIResponse(200, { inWishlist: true }, 'Added to wishlist'));
    }
  }

  if (destinationId) {
    const existing = await Wishlist.findOne({ user: userId, destination: destinationId });
    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      await User.findByIdAndUpdate(userId, { $pull: { savedDestinations: destinationId } });
      return res.status(200).json(new APIResponse(200, { inWishlist: false }, 'Removed from saved destinations'));
    } else {
      await Wishlist.create({ user: userId, destination: destinationId });
      await User.findByIdAndUpdate(userId, { $addToSet: { savedDestinations: destinationId } });
      return res.status(200).json(new APIResponse(200, { inWishlist: true }, 'Saved destination'));
    }
  }
});

export const getUserWishlist = catchAsync(async (req, res) => {
  const wishlistItems = await Wishlist.find({ user: req.user._id })
    .populate({
      path: 'tourPackage',
      populate: { path: 'destination' },
    })
    .populate('destination');

  res.status(200).json(new APIResponse(200, wishlistItems, 'Wishlist fetched successfully'));
});
