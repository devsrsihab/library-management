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
    getAllBookByCategory: builder.query({
      query: (catname) => ({
        url: `/books/bookebycat/${catname}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBookQuery, useGetSingleBookQuery, useGetAllBookByCategoryQuery } = bookApi;
