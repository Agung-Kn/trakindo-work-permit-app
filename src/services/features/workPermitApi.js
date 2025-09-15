import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../apiSlice";

export const workPermitApi = apiSlice.injectEndpoints({
	reducerPath: 'workPermitApi',
	baseQuery: fetchBaseQuery(),
  tagTypes: ['WorkPermit'],
  endpoints: (builder) => ({
     getWorkPermits: builder.query({
        query: ({ page = 1, limit = 10, search = "" }) => 
            `/public/work-permits?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        providesTags: ["WorkPermit"],
    }),
    getWorkPermitId: builder.query({
        query: (id) => `/public/work-permits/${id}`,
        providesTags: (result, error, id) => [{ type: "Article", id }],
    }),
    createWorkPermit: builder.mutation({
      query: (body) => ({
        url: '/public/work-permits/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WorkPermit'],
    }),
    updateWorkPermit: builder.mutation({
        query: ({ id, ...body }) => ({
            url: `/public/work-permits/${id}/update`,
            method: "PUT",
            body,
        }),
        invalidatesTags: (result, error, { id }) => [
            { type: "WorkPermit", id },
            "WorkPermit",
        ],
    }),
    deleteWorkPermit: builder.mutation({
        query: (id) => ({
            url: `/public/work-permits/${id}/delete`,
            method: "DELETE",
        }),
        invalidatesTags: (result, error, id) => [
            { type: "WorkPermit", id },
            "WorkPermit",
        ],
    }),
  }),
});

export const {
  useGetWorkPermitsQuery,
  useGetWorkPermitByIdQuery,
  useCreateWorkPermitMutation,
  useUpdateWorkPermitMutation,
  useDeleteWorkPermitMutation,
} = workPermitApi;
