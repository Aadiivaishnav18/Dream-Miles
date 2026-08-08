import jwt from 'jsonwebtoken';
import { APIError } from '../utils/apiError.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new APIError('Not authorized to access this route', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dream_miles_super_secret_jwt_key_2026_production_ready');
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new APIError('User not found or token invalid', 401);
    }

    if (user.isBlocked) {
      throw new APIError('Account is suspended. Please contact support.', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new APIError('Authentication failed: ' + error.message, 401));
  }
};
