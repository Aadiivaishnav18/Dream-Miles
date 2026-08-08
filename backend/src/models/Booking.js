import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tourPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
    packageTitle: { type: String },
    destinationName: { type: String },
    coverImage: { type: String },
    travelDate: { type: String, required: true },
    travelers: {
      adults: { type: Number, required: true, default: 1 },
      children: { type: Number, default: 0 },
      infants: { type: Number, default: 0 },
    },
    travelerDetails: [
      {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        gender: { type: String },
        age: { type: Number },
        nationality: { type: String, default: 'Indian' },
      },
    ],
    pricing: {
      basePrice: { type: Number, required: true },
      adultTotal: { type: Number, required: true },
      childTotal: { type: Number, default: 0 },
      infantTotal: { type: Number, default: 0 },
      addOnsTotal: { type: Number, default: 0 },
      tax: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      couponCode: { type: String, default: '' },
      totalAmount: { type: Number, required: true },
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Paid', 'Failed', 'Refunded', 'Partially Refunded'],
      default: 'Pending',
    },
    bookingStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Confirmed',
    },
    paymentMethod: { type: String, default: 'Razorpay' },
    paymentId: { type: String, default: '' },
    orderId: { type: String, default: '' },
    cancellationReason: { type: String, default: '' },
  },
  { timestamps: true }
);

bookingSchema.index({ bookingId: 1, user: 1, tourPackage: 1, bookingStatus: 1 });

export default mongoose.model('Booking', bookingSchema);
