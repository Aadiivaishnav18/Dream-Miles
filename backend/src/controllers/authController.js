import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'dream_miles_super_secret_jwt_key_2026_production_ready', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json(
      new APIResponse(
        statusCode,
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
          },
        },
        message
      )
    );
};

export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    throw new APIError('Please provide name, email, and password', 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new APIError('User with this email already exists', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    phone: phone || '',
  });

  sendTokenResponse(user, 201, res, 'Registration successful');
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new APIError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new APIError('Invalid email or password', 401);
  }

  if (user.isBlocked) {
    throw new APIError('Account suspended. Contact support.', 403);
  }

  sendTokenResponse(user, 200, res, 'Login successful');
});

export const logout = catchAsync(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json(new APIResponse(200, {}, 'Logout successful'));
});

export const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist').populate('savedDestinations');
  res.status(200).json(new APIResponse(200, user, 'Current user profile fetched'));
});

export const updateProfile = catchAsync(async (req, res) => {
  const { name, phone, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { name, phone, avatar } },
    { new: true, runValidators: true }
  );

  res.status(200).json(new APIResponse(200, user, 'Profile updated successfully'));
});
