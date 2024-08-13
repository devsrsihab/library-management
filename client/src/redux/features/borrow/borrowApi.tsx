import { baseApi } from "../../api/baseApi";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToBorrow: builder.mutation({
      query: (data) => ({
        url: "/borrowings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrowings"], // Invalidate cache to trigger refetch of borrow list
    }),
    getAllBorrowBooks: builder.query({
      query: () => ({
        url: "/borrowings",
        method: "GET",
      }),
      providesTags: ["Borrowings"], // Tag the query result
    }),
  }),
});

export const { useAddToBorrowMutation, useGetAllBorrowBooksQuery } = borrowApi;
