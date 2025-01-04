import { baseApi } from "./baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItemsFromWishlist: builder.query({
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
          url: `/wishlist/get-items-from-wishlist/${userId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["wishlist"],
    }),

    addItemToWishlist: builder.mutation({
      query: (data) => {
        return {
          url: "/wishlist/add-item-to-wishlist",
          method: "POST",
          body: data,
        };
      },

      invalidatesTags: ["wishlist"],
    }),

    deleteItemFromWishlist: builder.mutation({
      query: (itemId) => {
        return {
          url: `/wishlist/delete-item-from-wishlist/${itemId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export default wishlistApi;
