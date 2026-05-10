import { createSlice } from "@reduxjs/toolkit";

interface SuperAdminState {
    email: string | null;
    isAuthenticated: boolean;
}

const initialState: SuperAdminState = {
    email: null,
    isAuthenticated: false,
};

const superAdminSlice = createSlice({
    name: "superAdmin",
    initialState,
    reducers: {
        setSuperAdmin: (state, action) => {
            console.log("Action :",action)
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },

        clearSuperAdmin: (state) => {
            state.email = null;
            state.isAuthenticated = false;
        },
    },
});

export const {
    setSuperAdmin,
    clearSuperAdmin,
} = superAdminSlice.actions;

export default superAdminSlice.reducer;