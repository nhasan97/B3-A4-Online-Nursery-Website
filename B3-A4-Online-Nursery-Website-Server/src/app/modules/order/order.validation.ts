import { z } from 'zod';

//---------------------Validation schema for creating product---------------------

const cartItemSchema = z.object({
  _id: z
    .string({
      invalid_type_error: 'id must be string',
    })
    .trim()
    .optional(),

  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be string',
    })
    .trim(),

  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .nonnegative({ message: 'Price cannot be a negative number' })
    .finite({ message: 'Price must be finite' }),
  stock: z
    .number({
      required_error: 'Stock is required',
      invalid_type_error: 'Stock must be a number',
    })
    .nonnegative({ message: 'Stock cannot be a negative number' })
    .finite({ message: 'Stock must be finite' }),
  qty: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .nonnegative({ message: 'Quantity cannot be a negative number' })
    .finite({ message: 'Quantity must be finite' }),

  image: z
    .string({
      required_error: 'Image is required',
      invalid_type_error: 'Image must be string',
    })
    .trim(),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    orderId: z
      .string({
        required_error: 'ID is required',
        invalid_type_error: 'ID must be string',
      })
      .trim(),

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
      .trim(),

    phone: z
      .string({
        required_error: 'Phone is required',
        invalid_type_error: 'Phone must be string',
      })
      .trim(),

    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be string',
      })
      .trim(),

    items: z.array(cartItemSchema),

    totalAmount: z
      .number({
        required_error: 'Total Price is required',
        invalid_type_error: 'Total Price must be a number',
      })
      .nonnegative({ message: 'Total Price cannot be a negative number' })
      .finite({ message: 'Total Price must be finite' }),

    paymentMethod: z
      .string({
        required_error: 'paymentMethod is required',
        invalid_type_error: 'paymentMethod must be string',
      })
      .trim(),

    paymentStatus: z
      .string({
        required_error: 'paymentStatus is required',
        invalid_type_error: 'paymentStatus must be string',
      })
      .trim(),

    paid: z
      .number({
        required_error: 'Paid amount is required',
        invalid_type_error: 'Paid amount must be a number',
      })
      .nonnegative({ message: 'Paid amount cannot be a negative number' })
      .finite({ message: 'Paid amount must be finite' }),
  }),
});

//---------------------Validation schema for updating Order---------------------
const updateOrderValidationSchema = z.object({
  body: z.object({
    orderId: z
      .string({
        required_error: 'ID is required',
        invalid_type_error: 'ID must be string',
      })
      .trim()
      .optional(),

    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be string',
      })
      .trim()
      .optional(),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .trim()
      .optional(),

    phone: z
      .string({
        required_error: 'Phone is required',
        invalid_type_error: 'Phone must be string',
      })
      .trim()
      .optional(),

    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be string',
      })
      .trim()
      .optional(),

    items: z.array(cartItemSchema).optional(),

    totalAmount: z
      .number({
        required_error: 'Total Price is required',
        invalid_type_error: 'Total Price must be a number',
      })
      .nonnegative({ message: 'Total Price cannot be a negative number' })
      .finite({ message: 'Total Price must be finite' })
      .optional(),

    paymentMethod: z
      .string({
        required_error: 'paymentMethod is required',
        invalid_type_error: 'paymentMethod must be string',
      })
      .trim()
      .optional(),

    paymentStatus: z
      .string({
        required_error: 'paymentStatus is required',
        invalid_type_error: 'paymentStatus must be string',
      })
      .trim()
      .optional(),

    paid: z
      .number({
        required_error: 'Paid amount is required',
        invalid_type_error: 'Paid amount must be a number',
      })
      .nonnegative({ message: 'Paid amount cannot be a negative number' })
      .finite({ message: 'Paid amount must be finite' })
      .optional(),
  }),
});

//exporting validation schemas through OrderValidations object
export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
