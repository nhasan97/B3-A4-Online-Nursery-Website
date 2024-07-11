import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting products from DB------------------------*/
    getProducts: builder.query({
      query: () => {
        return { url: "/products", method: "GET" };
      },
      providesTags: ["product"],
    }),
    /*

    ------------------------endpoint for adding product in DB------------------------*/
    addProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/products",
          method: "POST",
          body: productInfo,
        };
      },
      invalidatesTags: ["product"],
    }),
    /*

    ------------------------endpoint for editing product in DB------------------------*/
    editProduct: builder.mutation({
      query: (payload) => {
        return {
          url: `/products/${payload._id}`,
          method: "PUT",
          body: payload.productDetails,
        };
      },
      invalidatesTags: ["product"],
    }),
    /*

    ------------------------endpoint for deleting product from DB------------------------*/
    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export default productApi;
