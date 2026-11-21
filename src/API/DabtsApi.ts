
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const debtsApi = createApi({
  reducerPath: "debtsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Debts"],

  endpoints: (builder) => ({

    getDebts: builder.query({
      query: (contact_id) =>
        contact_id
          ? `/debts?contact_id=${contact_id}`
          : "/debts",
      providesTags: ["Debts"],
    }),

    getDebt: builder.query({
      query: (id) => `/debts/${id}`,
      providesTags: ["Debts"],
    }),

    addDebt: builder.mutation({
      query: (data) => ({
        url: "/debts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Debts"],
    }),

    editDebt: builder.mutation({
      query: ({ id, data }) => ({
        url: `/debts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Debts"],
    }),

    deleteDebt: builder.mutation({
      query: (id) => ({
        url: `/debts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Debts"],
    }),
  }),
});

export const {
  useGetDebtsQuery,
  useGetDebtQuery,
  useAddDebtMutation,
  useEditDebtMutation,
  useDeleteDebtMutation,
} = debtsApi;
