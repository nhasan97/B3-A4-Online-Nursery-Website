import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*

    ------------------------endpoint for getting orders from DB------------------------*/
    getAllOrders: builder.query({
      query: ({ searchTerm, currentPage, itemsPerPage, userId }) => {
        const params = new URLSearchParams();

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (currentPage) {
          params.append("page", currentPage);
        }
        if (itemsPerPage) {
          params.append("limit", itemsPerPage);
        }

        return {
          url: `/orders/get-all-orders/${userId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),
    /*

    ------------------------endpoint for getting orders count by status from DB------------------------*/
    getOrderCountByStatus: builder.query({
      query: (userId) => {
        return {
          url: `/orders/get-orders-count-by-status/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    /*
    
    ------------------------endpoint for getting total sales from DB------------------------*/
    getTotalSale: builder.query({
      query: () => {
        return {
          url: "/orders/get-total-sale",
          method: "GET",
        };
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
