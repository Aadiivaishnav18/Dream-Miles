import ContactMessage from '../models/ContactMessage.js';
import { APIError } from '../utils/apiError.js';
import { APIResponse } from '../utils/apiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

export const submitContactMessage = catchAsync(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    throw new APIError('Please provide all required fields', 400);
  }

  const contact = await ContactMessage.create({
    name,
    email,
    phone: phone || '',
    subject,
    message,
  });

  res.status(201).json(new APIResponse(201, contact, 'Message submitted! Our team will contact you shortly.'));
});

export const getContactMessages = catchAsync(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.status(200).json(new APIResponse(200, messages, 'Contact messages fetched'));
});
