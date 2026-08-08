import mongoose from 'mongoose';

const itineraryItemSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  meals: { type: String, default: 'Breakfast included' },
  hotel: { type: String, default: 'Standard 4-Star Accommodations' },
  activities: [{ type: String }],
});

const tourPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    destinationName: { type: String },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    countryName: { type: String },
    category: {
      type: String,
      required: true,
      enum: [
        'Adventure',
        'Honeymoon',
        'Family',
        'Luxury',
        'Budget',
        'Solo Travel',
        'Backpacking',
        'Beach',
        'Wildlife',
        'Trekking',
        'Cultural',
        'Religious',
        'Weekend',
        'Road Trip',
        'International',
        'Domestic',
        'Group Tours',
        'Corporate Travel',
        'Student Tours',
        'Cruise',
        'Wellness',
        'Photography Tours',
      ],
      default: 'Cultural',
    },
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
    price: { type: Number, required: true }, // base adult price
    childPrice: { type: Number, default: 0 },
    infantPrice: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    overview: { type: String, required: true },
    highlights: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary: [itineraryItemSchema],
    mealsIncluded: { type: String, default: 'Breakfast & Dinner' },
    transportation: { type: String, default: 'AC Private Vehicle & Transfers' },
    pickupLocation: { type: String, default: 'Airport / Railway Station' },
    dropLocation: { type: String, default: 'Airport / Hotel' },
    maxGroupSize: { type: Number, default: 15 },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging', 'Hard'], default: 'Easy' },
    bestSeason: { type: String, default: 'Oct - Mar' },
    cancellationPolicy: { type: String, default: 'Free cancellation up to 7 days before departure. 50% refund within 7 days.' },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
    availableDates: [{ type: String }], // e.g. ["2026-09-01", "2026-09-15", "2026-10-01"]
    availableSeats: { type: Number, default: 20 },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

tourPackageSchema.index({ title: 1, slug: 1, destination: 1, country: 1, category: 1, price: 1, rating: -1, isFeatured: 1 });

export default mongoose.model('TourPackage', tourPackageSchema);
