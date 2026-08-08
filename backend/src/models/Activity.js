import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // e.g. "3 Hours", "Full Day"
    images: [{ type: String }],
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Easy' },
    ageLimit: { type: String, default: '5+ Years' },
    description: { type: String, required: true },
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    meetingPoint: { type: String, default: 'Hotel Lobby / Tour Operator Desk' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

activitySchema.index({ title: 1, destination: 1, price: 1, rating: -1 });

export default mongoose.model('Activity', activitySchema);
