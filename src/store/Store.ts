import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../API/AuthApi";
import { dashboardApi } from "../API/DashboardApi";
import { contactsApi } from "../API/ContactsApi";
import { folderApi } from "../API/FolderApi";
import { debtsApi } from "../API/DabtsApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [contactsApi.reducerPath]: contactsApi.reducer,
        [folderApi.reducerPath]: folderApi.reducer,
        [debtsApi.reducerPath]: debtsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware, 
            dashboardApi.middleware, 
            contactsApi.middleware,
            folderApi.middleware,
            debtsApi.middleware
        ),
});