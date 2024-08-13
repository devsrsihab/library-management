import { baseApi } from "../../api/baseApi";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToBorrow: builder.mutation({
      query: (data) => ({
        url: "/borrowings",
        method: "POST",
        body: data,
      }),
    }),
    getAllBorrowBooks: builder.query({
      query: () => ({
        url: "/borrowings",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddToBorrowMutation } = borrowApi;
