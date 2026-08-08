import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    author: { type: String, default: 'Dream Miles Travel Team' },
    category: {
      type: String,
      enum: ['Travel Tips', 'Destinations', 'Food', 'Culture', 'Budget Travel', 'Adventure', 'Visa', 'Packing', 'Safety', 'Photography'],
      default: 'Travel Tips',
    },
    coverImage: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    readTime: { type: String, default: '5 min read' },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

blogPostSchema.index({ title: 1, slug: 1, category: 1, isFeatured: 1 });

export default mongoose.model('BlogPost', blogPostSchema);
