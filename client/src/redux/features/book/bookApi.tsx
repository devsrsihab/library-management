import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBookQuery, useGetSingleBookQuery } = bookApi;
