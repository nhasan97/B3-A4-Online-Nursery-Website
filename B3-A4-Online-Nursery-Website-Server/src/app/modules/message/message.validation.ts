import { z } from 'zod';

//---------------------Validation schema for creating category---------------------
const createMessageValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be string',
      })
      .trim(),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' })
      .trim(),

    subject: z
      .string({
        required_error: 'Subject is required',
        invalid_type_error: 'Subject must be string',
      })
      .trim(),

    message: z
      .string({
        required_error: 'Message is required',
        invalid_type_error: 'Message must be string',
      })
      .trim(),

    sendersImage: z
      .string({
        invalid_type_error: 'Senders Image must be string',
      })
      .trim(),

    sentTo: z
      .string({
        required_error: 'Sent To is required',
        invalid_type_error: 'SentTo must be string',
      })
      .trim(),
  }),
});

//exporting validation schemas through MessageValidation object
export const MessageValidation = {
  createMessageValidationSchema,
};
