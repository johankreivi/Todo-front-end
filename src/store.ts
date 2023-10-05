import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import tableReducer from "./tableSlice";
import tabReducer from "./tabSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    table: tableReducer,
    tab: tabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

