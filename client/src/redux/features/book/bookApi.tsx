import { TBook, TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all get route
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
    }),
    getAllBook: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/books",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TBook[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: ["Books"],
    }),
    getAllBookByCategory: builder.query({
      query: (catname) => ({
        url: `/books/bookebycat/${catname}`,
        method: "GET",
      }),
    }),

    // all post route
    createBook: builder.mutation({
      query: (data) => ({
        url: '/books',
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  // all get hook
  useGetAllBookQuery,
  useGetSingleBookQuery,
  useGetAllBookByCategoryQuery,
  // all post hook
  useCreateBookMutation
} = bookApi;
