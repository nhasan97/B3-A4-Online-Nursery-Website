import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting blogs from DB------------------------*/
    getBlogs: builder.query({
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
          url: "/blogs/get-all-blogs",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
    }),
    /*

    ------------------------endpoint for getting blogs count from DB------------------------*/
    getBlogCount: builder.query({
      query: () => {
        return { url: "/blogs/get-all-blogs-count", method: "GET" };
      },
      providesTags: ["blog"],
    }),
    /*

    ------------------------endpoint for getting single blog from DB------------------------*/
    getTopBlogs: builder.query({
      query: () => {
        return { url: "/blogs/get-top-blogs", method: "GET" };
      },
      providesTags: ["blog"],
    }),
    /*

    ------------------------endpoint for getting single blog from DB------------------------*/
    getSingleBlog: builder.query({
      query: (_id) => {
        return { url: `/blogs/get-single-blog/${_id}`, method: "GET" };
      },
      providesTags: ["blog"],
    }),

    /*

    ------------------------endpoint for adding blog in DB------------------------*/
    addBlog: builder.mutation({
      query: (blogInfo) => {
        return {
          url: "/blogs/create-blog",
          method: "POST",
          body: blogInfo,
        };
      },
      invalidatesTags: ["blog"],
    }),
    /*

    ------------------------endpoint for editing blog in DB------------------------*/
    editBlog: builder.mutation({
      query: (payload) => {
        return {
          url: `/blogs/edit-blog/${payload._id}`,
          method: "PUT",
          body: payload.blogDetails,
        };
      },
      invalidatesTags: ["blog"],
    }),
    /*

    ------------------------endpoint for deleting blog from DB------------------------*/
    deleteBlog: builder.mutation({
      query: (id: string) => {
        return {
          url: `/blogs/delete-blog/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blog"],
    }),
  }),
});

export default blogApi;
