import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const folderApi = createApi({
  reducerPath: "folderApi",

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

  tagTypes: ["Folders"],

  endpoints: (builder) => ({

    getFolders: builder.query({
      query: () => "/folders",
      providesTags: ["Folders"],
    }),

    addFolder: builder.mutation({
      query: (data) => ({
        url: "/folders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Folders"],
    }),

    editFolder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/folders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Folders"],
    }),

    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Folders"],
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useAddFolderMutation,
  useEditFolderMutation,
  useDeleteFolderMutation,
} = folderApi;