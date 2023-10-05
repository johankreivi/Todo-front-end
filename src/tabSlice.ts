import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// React Redux state handling for active tab

interface tabState {
    activeTab: string;
}

const initialState: tabState = {
    activeTab: 'all'
};

export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload;
        }
    }
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;


