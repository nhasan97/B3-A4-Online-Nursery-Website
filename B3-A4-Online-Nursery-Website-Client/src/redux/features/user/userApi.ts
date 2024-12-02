import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (_id) => {
        return {
          url: `auth/users/${_id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export default userApi;
