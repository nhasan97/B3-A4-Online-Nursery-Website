import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export default orderApi;
