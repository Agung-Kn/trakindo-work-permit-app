import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../apiSlice";

export const managePermitApi = apiSlice.injectEndpoints({
	reducerPath: 'managePermitApi',
	baseQuery: fetchBaseQuery(),
  tagTypes: ['ManagePermit'],
  endpoints: (builder) => ({
     getPermits: builder.query({
        query: ({ page = 1, limit = 10, search = "" }) => 
            `/admin/permits?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        providesTags: ["ManagePermit"],
    }),
    getPermitById: builder.query({
        query: (id) => `/admin/permits/${id}`,
        providesTags: (result, error, id) => [{ type: "Article", id }],
    }),
    approvePermit: builder.mutation({
        query: ({ id, ...body }) => ({
            url: `/admin/permits/${id}/approve`,
            method: "PATCH",
            body,
        }),
        invalidatesTags: (result, error, { id }) => [
            { type: "ManagePermit", id },
            "ManagePermit",
        ],
    }),
  }),
});

export const {
  useGetPermitsQuery,
  useGetPermitByIdQuery,
  useApprovePermitMutation,
} = managePermitApi;
