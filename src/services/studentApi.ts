import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IResponse } from "./studentApi.type";

export const studentApi = createApi({
  reducerPath: "studentApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://to-dos-api.softclub.tj",}),
tagTypes: ['Todos'],
  endpoints: (build) => ({
    getStudents: build.query<IResponse, null>({
      query: () =>  `/api/to-dos`,
      providesTags:['Todos']
    }),
    deleteData: build.mutation<IResponse,number>({
      query:(id)=> ({
        url: `/api/to-dos?id=${id}`,
        method:"DELETE"
      }),
      invalidatesTags:["Todos"]
    }),
    AddData: build.mutation<IResponse, null>({
      query:(newUser)=> ({
        url: `/api/to-dos`,
        method:"POST",
         body: newUser,
      }),
      invalidatesTags:["Todos"]
    }),
  }),
});

export const { useGetStudentsQuery, useDeleteDataMutation, useAddDataMutation} = studentApi;  