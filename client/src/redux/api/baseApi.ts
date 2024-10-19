import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setuser } from "../features/auth/authSlice";
import { toast } from "sonner";
import axiosInstance from "../../lib/AxiosInstance";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://srs2-library-server.vercel.app/api/v1",
  // baseUrl: "http://localhost:8000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

//*base query with reference token
const baseQueryWithReferenceToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  const toastId = 3123213;

  if (result?.error?.status === 404) {
    toast.error("User not found", { id: toastId, duration: 1000 });
  }

  const state = api.getState() as RootState;
  const user = state.auth.user;
  const token = state.auth.token;

  if (result?.error?.status === 401 && user && token) {
    //*send the refresh token req
    const res = await axiosInstance.post(
      `https://srs2-library-server.vercel.app/api/v1/auth/refresh-token`
    );
    // const res = await axiosInstance.post(
    //   `http://localhost:8000/api/v1/auth/refresh-token`
    // );
    const data = await res?.data?.data;
    console.log("after login data ==>", data);
    if (data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setuser({ user, token: data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "Borrowings",
    "GetMe",
    "Users",
    "Books",
    "BookDetails",
    "Categories",
  ], // Define your tag types here

  baseQuery: baseQueryWithReferenceToken,
  endpoints: () => ({}),
});
