import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
    ------------------------endpoint for getting messages from DB------------------------*/
    getMessages: builder.query({
      query: ({ searchTerm, sort, currentPage, itemsPerPage, userEmail }) => {
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
          url: `/messages/get-all-messages/${userEmail}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["message"],
    }),
    /*
    ------------------------endpoint for getting messages count from DB------------------------*/
    getMessageCount: builder.query({
      query: () => {
        return { url: "/messages/get-all-messages-count", method: "GET" };
      },
      providesTags: ["message"],
    }),
    /*

    ------------------------endpoint for adding message in DB------------------------*/
    postMessage: builder.mutation({
      query: (messageInfo) => {
        return {
          url: "/messages/create-message",
          method: "POST",
          body: messageInfo,
        };
      },
      invalidatesTags: ["message"],
    }),
    /*

    ------------------------endpoint for editing message status in DB------------------------*/
    editMessageStatus: builder.mutation({
      query: (payload) => {
        return {
          url: `/messages/edit-message-status/${payload._id}`,
          method: "PATCH",
          body: { status: payload.status },
        };
      },
      invalidatesTags: ["message"],
    }),
    /*

    ------------------------endpoint for deleting message from DB------------------------*/
    deleteMessage: builder.mutation({
      query: (id: string) => {
        return {
          url: `/messages/delete-message/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["message"],
    }),
  }),
});

export default messageApi;
