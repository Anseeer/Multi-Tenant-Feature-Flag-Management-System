import { configureStore } from "@reduxjs/toolkit";
import superAdminReducer from "./slices/SuperAdminSlice"
import organaisationReducer from "./slices/OrganaisationSlice"
import adminReducer from "./slices/AdminSlice"
import userReducer from "./slices/UserSlice"

export const store = configureStore({
    reducer: {
        superAdmin: superAdminReducer,
        organaisation: organaisationReducer,
        admin: adminReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<
    typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;