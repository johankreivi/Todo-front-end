import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  data: any[];
  editingKey: number;
}

const initialState: TableState = {
  data: [],
  editingKey: -1,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    setEditingKey: (state, action: PayloadAction<number>) => {
      state.editingKey = action.payload;
    },
  },
});

export const { setData, setEditingKey} = tableSlice.actions;
export default tableSlice.reducer;
