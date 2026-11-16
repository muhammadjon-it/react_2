import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IResponse } from "./studentApi.type";

export const studentApi = createApi({
  reducerPath: "studentApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://to-dos-api.softclub.tj", }),
  tagTypes: ['Todos'],
  endpoints: (build) => ({

    /// GET

    getStudents: build.query<IResponse, null>({
      query: () => `/api/to-dos`,
      providesTags: ['Todos']
    }),

    /// DELETE

    deleteData: build.mutation<IResponse, number>({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Todos"]
    }),

    /// ADD

    AddData: build.mutation<IResponse, FormData>({
      query: (newUser) => ({
        url: `/api/to-dos`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Todos"]
    }),

    /// EDIT

    EditData: build.mutation<IResponse, FormData>({
      query: (EditData) => ({
        url: `/api/to-dos`,
        method: "PUT",
        body: EditData,
      }),
      invalidatesTags: ["Todos"]
    }),

    /// ADD IMG

    AddImageData: build.mutation<IResponse, FormData>({
      query: ({ todoId, formData }) => ({
        url: `/api/to-dos/${todoId}/images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todos"],
    }),

    /// DELETE IMG

    DeleteImg: build.mutation<IResponse, number>({
      query: (imageId) => ({
        url: `/api/to-dos/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),

    /// CHECKBOX

    StatusData: build.mutation<IResponse, number>({
      query: (id) => ({
        url: `/completed?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const { useGetStudentsQuery, useDeleteDataMutation, useAddDataMutation, useEditDataMutation, useAddImageDataMutation, useDeleteImgMutation, useStatusDataMutation } = studentApi;  