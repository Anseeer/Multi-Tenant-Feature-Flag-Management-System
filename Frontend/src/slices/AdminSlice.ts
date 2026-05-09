import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
    id: string | null;
    name: string | null;
    email: string | null;
    orgId: string | null;
    isAuthenticated: boolean;
}

const initialState: AdminState = {
    id: null,
    name: null,
    email: null,
    orgId: null,
    isAuthenticated: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.orgId = action.payload.orgId;
            state.isAuthenticated = true;
        },

        clearAdmin: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.orgId = null;
            state.isAuthenticated = false;
        },
    },
});

export const {
    setAdmin,
    clearAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;