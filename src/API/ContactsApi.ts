
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const contactsApi = createApi({
  reducerPath: "contactsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Contacts"],

  endpoints: (builder) => ({
    
   getContacts: builder.query({
    query: (folder_id) =>
        folder_id ? `/contacts?folder_id=${folder_id}` : "/contacts",
    providesTags: ["Contacts"],
}),

    addContact: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),

    getContact: builder.query({
      query: (id) => `/contacts/${id}`,
    }),

    editContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contacts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),

   

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useGetContactQuery,
  useEditContactMutation,
  useDeleteContactMutation,
} = contactsApi;
