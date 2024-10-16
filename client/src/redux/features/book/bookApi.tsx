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
      transformResponse: (response: TResponseRedux<TBook>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["BookDetails"],
    }),

    getAllBookByAuthor: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/books/byauthor",
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

    getAllRecentViewBook: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/recentviews",
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

    // all post route
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: (args) => ({
        url: `/books/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Books",
        { type: "BookDetails", id: arg.bookId },
      ],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    createRecentViewBook: builder.mutation({
      query: (data) => ({
        url: "/recentviews",
        method: "POST",
        body: data,
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
  useGetAllBookByAuthorQuery,
  useGetAllRecentViewBookQuery,
  // all post hook
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useCreateRecentViewBookMutation,
} = bookApi;
