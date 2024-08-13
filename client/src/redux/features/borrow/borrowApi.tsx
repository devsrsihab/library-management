import { baseApi } from "../../api/baseApi";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToBorrow: builder.mutation({
      query: (data) => ({
        url: "/borrowings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrowings"],
    }),
    getAllBorrowBooks: builder.query({
      query: () => ({
        url: "/borrowings",
        method: "GET",
      }),
      providesTags: ["Borrowings"],
    }),
    removeBorrowBook: builder.mutation({
      query: (id) => ({
        url: `/borrowings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Borrowings"],
    }),
  }),
});

export const {
  useAddToBorrowMutation,
  useGetAllBorrowBooksQuery,
  useRemoveBorrowBookMutation,
} = borrowApi;
