import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting categories from DB------------------------*/
    getCategories: builder.query({
      query: () => {
        return { url: "/categories", method: "GET" };
      },
      providesTags: ["category"],
    }),
    /*

    ------------------------endpoint for adding category in DB------------------------*/
    addCategory: builder.mutation({
      query: (categoryInfo) => {
        return {
          url: "/categories",
          method: "POST",
          body: categoryInfo,
        };
      },
      invalidatesTags: ["category"],
    }),
    /*

    ------------------------endpoint for editing category in DB------------------------*/
    editCategory: builder.mutation({
      query: (payload) => {
        return {
          url: `/categories/${payload._id}`,
          method: "PUT",
          body: payload.categoryDetails,
        };
      },
      invalidatesTags: ["category"],
    }),
    /*

    ------------------------endpoint for deleting category from DB------------------------*/
    deleteCategory: builder.mutation({
      query: (id: string) => {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export default categoryApi;
