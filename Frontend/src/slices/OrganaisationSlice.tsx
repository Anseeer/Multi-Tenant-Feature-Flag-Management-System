import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Organization {
    _id: string;
    name: string;
    description: string;
    createdAt?: string;
}

interface OrganizationState {
    organizations: Organization[];
}

const initialState: OrganizationState = {
    organizations: [],
};

const organizationSlice = createSlice({
    name: "organization",
    initialState,

    reducers: {
        setOrganizations: (state, action: PayloadAction<Organization[]>) => {
            state.organizations = action.payload;
        },

        addOrganization: (state, action: PayloadAction<Organization>) => {
            state.organizations.unshift(action.payload);
        },

        removeOrganization: (state, action: PayloadAction<string>) => {
            state.organizations =
                state.organizations.filter(
                    (org) => org._id !== action.payload
                );
        },

        clearOrganizations: (state) => {
            state.organizations = [];
        },
    },
});

export const {
    setOrganizations,
    addOrganization,
    removeOrganization,
    clearOrganizations,
} = organizationSlice.actions;

export default organizationSlice.reducer;