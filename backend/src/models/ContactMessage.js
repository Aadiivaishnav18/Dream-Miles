import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['New', 'In Progress', 'Resolved'], default: 'New' },
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);
