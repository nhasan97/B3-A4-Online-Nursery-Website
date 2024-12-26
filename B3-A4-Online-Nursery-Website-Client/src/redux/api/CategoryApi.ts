import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting categories from DB------------------------*/
    getCategories: builder.query({
      query: ({ searchTerm, sort, currentPage, itemsPerPage }) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
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
          url: "/categories/get-all-categories",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["category"],
    }),
    /*
    ------------------------endpoint for getting categories count from DB------------------------*/
    getCategoryCount: builder.query({
      query: () => {
        return { url: "/categories/get-all-categories-count", method: "GET" };
      },
      providesTags: ["category"],
    }),
    /*

    ------------------------endpoint for adding category in DB------------------------*/
    addCategory: builder.mutation({
      query: (categoryInfo) => {
        return {
          url: "/categories/create-category",
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
          url: `/categories/edit-catgory/${payload._id}`,
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
          url: `/categories/delete-catgory/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export default categoryApi;
