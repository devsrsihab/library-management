import { TQueryParams } from "../../../types";
import { baseApi } from "../../api/baseApi";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all get routes
    getAllBorrowBooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/borrowings",
          method: "GET",
          params,
        };
      },
      providesTags: ["Borrowings"],
    }),

    // all post route
    addToBorrow: builder.mutation({
      query: (data) => ({
        url: "/borrowings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrowings"],
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
  // all get hooks
  useGetAllBorrowBooksQuery,
  //  all post hooks
  useAddToBorrowMutation,
  useRemoveBorrowBookMutation,
} = borrowApi;
