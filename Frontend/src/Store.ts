import { configureStore } from "@reduxjs/toolkit";
import superAdminReducer from "./slices/SuperAdminSlice"
import organaisationReducer from "./slices/OrganaisationSlice"

export const store = configureStore({
    reducer: {
        superAdmin: superAdminReducer,
        organaisation: organaisationReducer,
    },
});

export type RootState = ReturnType<
    typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;