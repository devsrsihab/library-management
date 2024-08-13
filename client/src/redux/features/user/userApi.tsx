import { baseApi } from "../../api/baseApi";

const getMeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["GetMe"],
    }),
  }),
});

export const { useGetMeQuery } = getMeApi;
