import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../apiSlice";

export const workPermitApi = apiSlice.injectEndpoints({
	reducerPath: 'workPermitApi',
	baseQuery: fetchBaseQuery(),
  tagTypes: ['WorkPermit'],
  endpoints: (builder) => ({
    getWorkPermits: builder.query({
      query: () => '/work-permits',
      providesTags: ['WorkPermit'],
    }),
    getWorkPermitById: builder.query({
      query: (id) => `/work-permits/${id}`,
    }),
    createWorkPermit: builder.mutation({
      query: (body) => ({
        url: '/work-permits',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WorkPermit'],
    }),
    deleteWorkPermit: builder.mutation({
      query: (id) => ({
        url: `/work-permits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WorkPermit'],
    }),
  }),
});

export const {
  useGetWorkPermitsQuery,
  useGetWorkPermitByIdQuery,
  useCreateWorkPermitMutation,
  useDeleteWorkPermitMutation,
} = workPermitApi;
