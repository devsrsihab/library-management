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

    // all get routes
    getAllBorrowBooksForAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/borrowings/admin",
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
      invalidatesTags: (_result, _error, arg) => [
        "Borrowings",
        { type: "BookDetails", id: arg.id },
      ],
    }),

    removeBorrowBook: builder.mutation({
      query: (id) => ({
        url: `/borrowings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Borrowings",
        { type: "BookDetails", id: arg.id },
      ],
    }),
  }),
});

export const {
  // all get hooks
  useGetAllBorrowBooksQuery,
  useGetAllBorrowBooksForAdminQuery,
  //  all post hooks
  useAddToBorrowMutation,
  useRemoveBorrowBookMutation,
} = borrowApi;
