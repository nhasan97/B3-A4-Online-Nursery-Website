import { TProduct } from "@/types/product.type";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting products from DB------------------------*/
    getProducts: builder.query<{ status: boolean; data: TProduct[] }, string>({
      query: () => {
        return { url: "/products", method: "GET" };
      },
      providesTags: ["product"],
    }),
    /*

    ------------------------endpoint for adding product in DB------------------------*/
    addProduct: builder.mutation<
      { acknowledged: boolean; insertedId: string },
      TProduct
    >({
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

    ------------------------endpoint for deleting product from DB------------------------*/
    deleteProduct: builder.mutation<
      { status: boolean; data: TProduct },
      string
    >({
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
