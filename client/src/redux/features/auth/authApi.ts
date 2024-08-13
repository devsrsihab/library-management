import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Borrowings", "GetMe"],
    }),
    registerViewer: builder.mutation({
      query: (payload) => ({
        url: "/auth/register-viewer",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Borrowings", "GetMe"],
    }),
  }),
});

export const { useLoginMutation, useRegisterViewerMutation } = authApi;
