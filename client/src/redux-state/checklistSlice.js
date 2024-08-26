import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checklist: {
    title: "",
    description: "",
    general: false,
    note: [
      {
        titleNote: "",
        done: false,
      },
    ],
  },
  userId: "",
};

export const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    setChecklist: (state, action) => {
      state.checklist = action.payload;
    },
  },
});

export const { setChecklist } = checklistSlice.actions;
export default checklistSlice.reducer;
