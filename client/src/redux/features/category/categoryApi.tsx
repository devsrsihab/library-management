import { TCategory, TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all get route
    getAllCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/category",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TCategory[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: ["Categories"],
    }),

    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TCategory>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["Categories"],
    }),

    // all post route
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (args) => ({
        url: `/category/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  // all get hook
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  // all post hook
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
