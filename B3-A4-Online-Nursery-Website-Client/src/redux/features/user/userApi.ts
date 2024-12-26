import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*

    ------------------------endpoint for getting customers from DB------------------------*/
    getAllUsers: builder.query({
      query: ({ searchTerm, currentPage, itemsPerPage }) => {
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

        return { url: "/users/get-all-users", method: "GET", params: params };
      },
      providesTags: ["user"],
    }),
    /*

    ------------------------endpoint for getting customers count from DB------------------------*/
    getAllUsersCount: builder.query({
      query: () => {
        return { url: "/users/get-all-users-count", method: "GET" };
      },
      providesTags: ["user"],
    }),
    /*

    ------------------------endpoint for getting  specific customer from DB------------------------*/
    getUser: builder.query({
      query: (_id) => {
        return {
          url: `/users/get-speicific-user/${_id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export default userApi;
