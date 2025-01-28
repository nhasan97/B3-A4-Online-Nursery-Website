import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { userModel } from '../user/user.model';
import { TOrder } from './order.interface';
import { orderModel } from './order.model';
import Stripe from 'stripe';
import config from '../../config';
import mongoose from 'mongoose';
import { productModel } from '../product/product.model';

/*

----------------service function for fetching all order data from DB----------------*/
const getAllOrdersFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const queryObject = { ...query };

  const searchableFields = ['orderId', 'name', 'email', 'status'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = orderModel.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

  excludeFields.forEach((el) => delete queryObject[el]);

  let findingQuery = {};
  if (user?.role === 'admin') {
    findingQuery = {
      isDeleted: { $ne: true },
      ...queryObject,
    };
  } else {
    findingQuery = {
      isDeleted: { $ne: true },
      email: user?.email,
      ...queryObject,
    };
  }

  const filterQuery = searchQuery.find(findingQuery);

  let sort = 'estimatedDelivery';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 10;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = page * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const orders = await paginateQuery.limit(limit);
  return orders;
};
/*

----------------service function for fetching all users count data from DB----------------*/
const getAllOrdersCountFromDB = async (userId: string) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  let query = {};
  if (user?.role === 'admin') {
    query = {
      isDeleted: { $ne: true },
    };
  } else {
    query = {
      isDeleted: { $ne: true },
      email: user?.email,
    };
  }

  const response = await orderModel.countDocuments(query);
  return response;
};
/*

----------------service function for fetching specific order data from DB----------------*/
const getSpecificOrderFromDB = async (orderId: string) => {
  const response = orderModel.doesOrderExist(orderId);

  if (!response) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return response;
};
/*

----------------service function for fetching all users count data from DB----------------*/
const getOrderCountByStatusFromDB = async (userId: string) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  let query = {};
  if (user?.role === 'admin') {
    query = {
      isDeleted: { $ne: true },
    };
  } else {
    query = {
      isDeleted: { $ne: true },
      email: user?.email,
    };
  }

  const response = await orderModel.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  return response;
};
/*

----------------service function for inserting Order data in DB----------------*/
const getTotalSalesFromDB = async () => {
  const response = await orderModel.aggregate([
    {
      $match: { isDeleted: { $ne: true } },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$paid' },
      },
    },
    {
      $project: {
        _id: 0,
        totalSales: 1,
      },
    },
  ]);
  return response; // Return totalSales or 0 if no data
};
/*

----------------service function for inserting Order data in DB----------------*/
const createOrderIntoDB = async (orderData: TOrder) => {
  const session = await mongoose.startSession(); // Start a transaction session
  session.startTransaction();

  try {
    // Loop through items to validate stock availability
    for (const item of orderData.items) {
      const productId = item._id;
      const quantityToDeduct = item.qty;

      // Fetch the product to check stock availability
      const product = await productModel.findById(productId).session(session);

      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      if (product.stock < quantityToDeduct) {
        throw new Error(
          `Insufficient stock for product "${product.title}". Available: ${product.stock}, Required: ${quantityToDeduct}`,
        );
      }

      // Reduce stock
      await productModel.updateOne(
        { _id: productId },
        { $inc: { stock: -quantityToDeduct } },
        { session },
      );
    }

    // Save the order to the database
    const response = await orderModel.create([orderData], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return response;
  } catch (error) {
    // Rollback transaction in case of error
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

const getPaymentIntentFromStirpe = async (price: number) => {
  const stripe = new Stripe(config.stripe_secrate_key as string);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(price * 100),
    currency: 'usd',

    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

const updateOrderStatusIntoDB = async (id: string, status: string) => {
  const query = { _id: id };
  const option = { upsert: false, new: true };
  const updatedDoc = {
    $set: { status },
  };

  const result = await orderModel.updateOne(query, updatedDoc, option);

  return result;
};

//exporting all the service functions through orderServices object
export const orderServices = {
  getAllOrdersFromDB,
  getAllOrdersCountFromDB,
  getOrderCountByStatusFromDB,
  getSpecificOrderFromDB,
  getTotalSalesFromDB,
  createOrderIntoDB,
  getPaymentIntentFromStirpe,
  updateOrderStatusIntoDB,
};
