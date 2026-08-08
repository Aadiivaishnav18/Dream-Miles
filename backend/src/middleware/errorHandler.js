import { APIError } from '../utils/apiError.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof APIError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';
    error = new APIError(message, statusCode, error.errors || []);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};
