import { TBook, TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllBook: builder.query({
    //   query: () => ({
    //     url: "/books",
    //     method: "GET",
    //   }),
    // }),
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
