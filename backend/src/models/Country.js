import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    isoAlpha2: { type: String, uppercase: true },
    isoAlpha3: { type: String, uppercase: true },
    countryCode: { type: String },
    capital: { type: String },
    continent: { type: String, required: true },
    region: { type: String },
    currency: { type: String },
    currencySymbol: { type: String },
    primaryLanguages: [{ type: String }],
    flag: { type: String },
    image: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    bestTimeToVisit: { type: String },
    visaInfo: { type: String },
    timezone: { type: String },
    popularActivities: [{ type: String }],
    averageTripDuration: { type: String },
    travelDifficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging', 'Varies'], default: 'Easy' },
    safetyInfo: { type: String },
    entryRequirements: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

countrySchema.index({ name: 1, slug: 1, continent: 1, isFeatured: 1 });

export default mongoose.model('Country', countrySchema);
