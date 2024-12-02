import { Schema, model } from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { OrderModel, TOrder } from './order.interface';

const TCartItemSchema = new Schema({
  _id: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

//creating mongoose schema as the first layer of validation for order data
const orderSchema = new Schema<TOrder, OrderModel>({
  orderId: {
    type: String,
    required: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  items: {
    type: [TCartItemSchema],
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },

  paymentStatus: {
    type: String,
    required: true,
    trim: true,
  },

  paid: {
    type: Number,
    required: true,
  },

  transactionID: {
    type: String,
    required: true,
    trim: true,
  },

  estimatedDelivery: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
    trim: true,
  },

  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

//using document middleware for checking if the document already exists or not
orderSchema.pre('save', async function (next) {
  const doesExist = await orderModel.findOne({
    orderId: this.orderId,
    name: this.name,
    email: this.email,
    phone: this.phone,
    address: this.address,
    items: this.items,
    totalAmount: this.totalAmount,
    paymentMethod: this.paymentMethod,
    paymentStatus: this.paymentStatus,
    paid: this.paid,
    transactionID: this.transactionID,
    estimatedDelivery: this.estimatedDelivery,
    status: this.status,
  });
  if (doesExist) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Order already exists',
    );
  }
  next();
});

//using query middleware for fetching documents not having isDeleted property as true
orderSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//using query middleware for fetching single document not having isDeleted property as true
orderSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if the order exists or not using static method
orderSchema.statics.doesOrderExist = async function (id: string) {
  return await orderModel.findById(id);
};

//creating and exporting model for order
export const orderModel = model<TOrder, OrderModel>('Order', orderSchema);
