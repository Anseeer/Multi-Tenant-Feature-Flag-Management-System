import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    orgId: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    orgId: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.orgId = action.payload.orgId;
            state.isAuthenticated = true;
        },

        clearUser: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.orgId = null;
            state.isAuthenticated = false;
        },
    },
});

export const {
    setUser,
    clearUser,
} = userSlice.actions;

export default userSlice.reducer;