import { configureStore } from "@reduxjs/toolkit";
import superAdminReducer from "./slices/SuperAdminSlice"
import organaisationReducer from "./slices/OrganaisationSlice"
import adminReducer from "./slices/AdminSlice"

export const store = configureStore({
    reducer: {
        superAdmin: superAdminReducer,
        organaisation: organaisationReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<
    typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;