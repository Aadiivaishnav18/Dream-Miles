import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['Created', 'Authorized', 'Captured', 'Failed', 'Refunded'], default: 'Created' },
    provider: { type: String, enum: ['Razorpay', 'Stripe', 'Demo'], default: 'Razorpay' },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
