import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../apiSlice";

export const workPermitApi = apiSlice.injectEndpoints({
	reducerPath: 'workPermitApi',
	baseQuery: fetchBaseQuery(),
  tagTypes: ['WorkPermit'],
  endpoints: (builder) => ({
    createWorkPermit: builder.mutation({
      query: (body) => ({
        url: '/work-permits/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WorkPermit'],
    }),
  }),
});

export const {
  useCreateWorkPermitMutation,
} = workPermitApi;
