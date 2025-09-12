import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../apiSlice";

export const formApi = apiSlice.injectEndpoints({
	reducerPath: 'formApi',
	baseQuery: fetchBaseQuery(),
  tagTypes: ['form'],
  endpoints: (builder) => ({
    getformBySlug: builder.query({
      query: (slug) => `/public/forms/${slug}`,
    }),
  }),
});

export const {
  useGetformBySlugQuery,
} = formApi;
