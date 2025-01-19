import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting logged in user from DB------------------------*/
    getLoggedInUser: builder.query({
      query: (userId) => {
        return {
          url: `/users/get-speicific-user/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    /*
    ------------------------endpoint for updating logged in user info in DB------------------------*/
    updateLoggedInUserInfo: builder.mutation({
      query: (payload) => {
        return {
          url: `/users/edit-user-info/${payload._id}`,
          method: "PUT",
          body: payload.updatedUserDetails,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export default profileApi;
