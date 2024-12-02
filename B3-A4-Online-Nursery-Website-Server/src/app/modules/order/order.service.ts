import { TOrder } from './order.interface';
import { orderModel } from './order.model';
import Stripe from 'stripe';

/*

----------------service function for fetching all categories data from DB----------------*/
const getAllOrdersFromDB = async () => {
  const response = await orderModel.find();
  return response;
};
/*
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

  console.log(paymentIntent);

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

const updateOrderStatusIntoDB = async (id: string, status: string) => {
  const query = { _id: id };
  const option = { upsert: false };
  const updatedDoc = {
    $set: { status },
  };

  const result = await orderModel.updateOne(query, updatedDoc, option);

  return result;
};

//exporting all the service functions through orderServices object
export const orderServices = {
  getAllOrdersFromDB,
  createOrderIntoDB,
  getPaymentIntentFromStirpe,
  updateOrderStatusIntoDB,
};
