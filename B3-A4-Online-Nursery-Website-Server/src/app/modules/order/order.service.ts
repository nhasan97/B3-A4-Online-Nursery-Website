import { TOrder } from './order.interface';
import { orderModel } from './order.model';
import Stripe from 'stripe';

/*

----------------service function for fetching all categories data from DB----------------*/
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
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
  const filterQuery = searchQuery.find({
    isDeleted: { $ne: true },
    ...queryObject,
  });

  let sort = 'createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
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

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};
/*

----------------service function for fetching all users count data from DB----------------*/
const getAllOrdersCountFromDB = async () => {
  const response = await orderModel.countDocuments({
    isDeleted: { $ne: true },
  });
  return response;
};
/*

----------------service function for fetching all users count data from DB----------------*/
const getOrderCountByStatusFromDB = async () => {
  const response = await orderModel.aggregate([
    {
      $match: { isDeleted: { $ne: true } },
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

----------------service function for fetching all categories data from DB----------------*/
const getLoggedInUsersOrdersFromDB = async (
  loggedInUserEmail: string,
  query: Record<string, unknown>,
) => {
  const queryObject = { ...query };

  const searchableFields = ['orderId', 'status'];
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
  const filterQuery = searchQuery.find({
    email: loggedInUserEmail,
    isDeleted: { $ne: true },
    ...queryObject,
  });

  let sort = 'createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
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

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};
/*

----------------service function for fetching all users count data from DB----------------*/
const getLoggedInUsersOrdersCountFromDB = async (loggedInUserEmail: string) => {
  const response = await orderModel.countDocuments({
    email: loggedInUserEmail,
    isDeleted: { $ne: true },
  });
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
  const response = await orderModel.create(orderData);

  //for orderData.items run comand take id find from database and uodated stock
  return response;
};

const getPaymentIntentFromStirpe = async (price: number) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
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
  getLoggedInUsersOrdersFromDB,
  getLoggedInUsersOrdersCountFromDB,
  getTotalSalesFromDB,
  createOrderIntoDB,
  getPaymentIntentFromStirpe,
  updateOrderStatusIntoDB,
};
