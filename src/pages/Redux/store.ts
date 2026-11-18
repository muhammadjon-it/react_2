
import { configureStore } from "@reduxjs/toolkit";

import TodoSincReducer from "./ReduxSinc/Todo";

export const store = configureStore({
    reducer: {
        todoSinc: TodoSincReducer,
    },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
