import BlogPost from '../models/BlogPost.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';
import { createSlug } from '../utils/slugify.js';

export const getBlogPosts = catchAsync(async (req, res) => {
  const { category, search, featured } = req.query;
  const query = {};

  if (category) query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const posts = await BlogPost.find(query).sort({ createdAt: -1 });
  res.status(200).json(new APIResponse(200, posts, 'Blog posts fetched successfully'));
});

export const getBlogPostBySlug = catchAsync(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug });
  if (!post) throw new APIError('Blog post not found', 404);
  res.status(200).json(new APIResponse(200, post, 'Blog post fetched successfully'));
});

export const createBlogPost = catchAsync(async (req, res) => {
  const slug = createSlug(req.body.title);
  const post = await BlogPost.create({ ...req.body, slug });
  res.status(201).json(new APIResponse(201, post, 'Blog post created successfully'));
});

export const updateBlogPost = catchAsync(async (req, res) => {
  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) throw new APIError('Blog post not found', 404);
  res.status(200).json(new APIResponse(200, post, 'Blog post updated'));
});

export const deleteBlogPost = catchAsync(async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) throw new APIError('Blog post not found', 404);
  res.status(200).json(new APIResponse(200, {}, 'Blog post deleted'));
});
