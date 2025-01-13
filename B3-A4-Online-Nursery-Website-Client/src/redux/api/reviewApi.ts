import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*

    ------------------------endpoint for getting reviews from DB------------------------*/
    getOverallReviews: builder.query({
      query: () => {
        return { url: "/reviews/get-overall-review", method: "GET" };
      },
      providesTags: ["review"],
    }),
    /*

    ------------------------endpoint for getting product reviews from DB------------------------*/
    getProductReviews: builder.query({
      query: (productId) => {
        return {
          url: `/reviews/get-product-review/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    /*

    ------------------------endpoint for adding review in DB------------------------*/
    addReview: builder.mutation({
      query: (reviewInfo) => {
        return {
          url: "/reviews/post-overall-review",
          method: "POST",
          body: reviewInfo,
        };
      },
      invalidatesTags: ["review"],
    }),
    /*

    ------------------------endpoint for adding review in DB------------------------*/
    addProductReview: builder.mutation({
      query: (reviewInfo) => {
        return {
          url: "/reviews/post-product-review",
          method: "POST",
          body: reviewInfo,
        };
      },
      invalidatesTags: ["review"],
    }),
  }),
});

export default reviewApi;
