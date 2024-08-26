import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js";
import checklist from "./checklistSlice.js";

export const store = configureStore({
  reducer: {
    user,
    checklist,
  },
});
