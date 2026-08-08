import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    location: { type: String, required: true },
    images: [{ type: String }],
    rating: { type: Number, default: 4.5 },
    starRating: { type: Number, default: 4 },
    pricePerNight: { type: Number, required: true },
    amenities: [{ type: String }], // e.g. ["WiFi", "Pool", "Gym", "Spa", "Parking", "Restaurant", "Airport Transfer", "AC"]
    roomTypes: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        capacity: { type: Number, default: 2 },
        description: { type: String },
      },
    ],
    description: { type: String, required: true },
    checkInTime: { type: String, default: '14:00' },
    checkOutTime: { type: String, default: '11:00' },
    cancellationPolicy: { type: String, default: 'Free cancellation up to 48 hours before check-in.' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

hotelSchema.index({ name: 1, destination: 1, pricePerNight: 1, rating: -1 });

export default mongoose.model('Hotel', hotelSchema);
