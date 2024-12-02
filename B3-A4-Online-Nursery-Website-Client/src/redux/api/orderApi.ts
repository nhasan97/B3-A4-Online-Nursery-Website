import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting orders from DB------------------------*/
    getAllOrders: builder.query({
      query: () => {
        return { url: "/orders/get-all-orders", method: "GET" };
      },
      providesTags: ["order"],
    }),
    /*

    ------------------------endpoint for adding order in DB------------------------*/
    placeOrder: builder.mutation({
      query: (orderInfo) => {
        console.log(orderInfo);

        return {
          url: "/orders",
          method: "POST",
          body: orderInfo,
        };
      },
      invalidatesTags: ["order"],
    }),
    /*

    ------------------------endpoint for editing order status in DB------------------------*/
    editOrderStatus: builder.mutation({
      query: (payload) => {
        return {
          url: `/orders/edit-order-status/${payload._id}`,
          method: "PATCH",
          body: { status: payload.status },
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export default orderApi;
