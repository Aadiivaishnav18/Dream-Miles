import { APIError } from '../utils/apiError.js';

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new APIError(`User role ${req.user?.role || 'Guest'} is not authorized for this resource`, 403));
    }
    next();
  };
};
