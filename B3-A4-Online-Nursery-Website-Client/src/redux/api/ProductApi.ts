import { TProduct } from "@/types/product.type";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for adding product in DB------------------------*/
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
  }),
});

export default productApi;
