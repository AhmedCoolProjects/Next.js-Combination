import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./slices/modeSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    mode: modeSlice,
  },
});
