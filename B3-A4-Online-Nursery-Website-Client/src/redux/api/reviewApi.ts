import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverallReviews: builder.query({
      query: () => {
        return { url: "/reviews/get-overall-review", method: "GET" };
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
  }),
});

export default reviewApi;
