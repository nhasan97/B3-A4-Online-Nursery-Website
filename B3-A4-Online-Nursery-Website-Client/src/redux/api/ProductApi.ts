import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting products from DB------------------------*/
    getProducts: builder.query({
      query: ({
        searchTerm,
        categoryToLoad,
        minProductPrice,
        maxProductPrice,
        sort,
        currentPage,
        itemsPerPage,
      }) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (categoryToLoad) {
          categoryToLoad.forEach((element: string) => {
            params.append("category", element);
          });
        }
        if (minProductPrice) {
          params.append("minProductPrice", minProductPrice);
        }
        if (maxProductPrice) {
          params.append("maxProductPrice", maxProductPrice);
        }
        if (sort) {
          params.append("sort", sort);
        }
        if (currentPage) {
          params.append("page", currentPage);
        }
        if (itemsPerPage) {
          params.append("limit", itemsPerPage);
        }

        return {
          url: "/products/get-all-products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    /*

    ------------------------endpoint for getting products count from DB------------------------*/
    getProductCount: builder.query({
      query: () => {
        return { url: "/products/get-all-products-count", method: "GET" };
      },
      providesTags: ["product"],
    }),
    /*

    ------------------------endpoint for getting single product from DB------------------------*/
    getSingleProduct: builder.query({
      query: (_id) => {
        return { url: `/products/get-single-product/${_id}`, method: "GET" };
      },
      providesTags: ["product"],
    }),
    /*

    ------------------------endpoint for getting min max product price from DB------------------------*/
    getMinMaxProductPrice: builder.query({
      query: () => {
        return { url: "/products/get-min-max-price", method: "GET" };
      },
      providesTags: ["product"],
    }),
    /*

    ------------------------endpoint for editing order status in DB------------------------*/
    updateProductStock: builder.mutation({
      query: (payload) => {
        return {
          url: `/orders/edit-product-stock/${payload._id}`,
          method: "PATCH",
          body: { status: payload.status },
        };
      },
      invalidatesTags: ["product"],
    }),
    /*

    ------------------------endpoint for adding product in DB------------------------*/
    addProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/products/create-product",
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
          url: `/products/edit-product/${payload._id}`,
          method: "PUT",
          body: payload.formData,
        };
      },
      invalidatesTags: ["product"],
    }),
    /*

    ------------------------endpoint for deleting product from DB------------------------*/
    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/products/delete-product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export default productApi;
