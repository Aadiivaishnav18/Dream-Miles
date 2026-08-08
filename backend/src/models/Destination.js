import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    countryName: { type: String },
    stateProvince: { type: String, default: '' },
    city: { type: String, default: '' },
    heroImage: { type: String, required: true },
    gallery: [{ type: String }],
    shortDescription: { type: String, required: true },
    description: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    popularityScore: { type: Number, default: 85 },
    rating: { type: Number, default: 4.8 },
    bestTime: { type: String },
    averageBudget: { type: String },
    currency: { type: String, default: 'USD' },
    languages: [{ type: String }],
    attractions: [{ type: String }],
    popularActivities: [{ type: String }],
    travelTips: { type: String },
    safetyInfo: { type: String },
    weatherInfo: { type: String },
    startingPrice: { type: Number, default: 499 },
    categoryTag: { type: String, enum: ['Popular', 'Trending', 'Hidden Gem', 'Luxury', 'Budget', 'Adventure', 'Family', 'Honeymoon', 'Beach', 'Cultural'], default: 'Popular' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

destinationSchema.index({ name: 1, slug: 1, country: 1, rating: -1, isFeatured: 1 });

export default mongoose.model('Destination', destinationSchema);
