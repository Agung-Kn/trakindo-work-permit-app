import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  })
});

export const { useLoginMutation, useRefreshMutation, useLazyProfileQuery } = authApi;
