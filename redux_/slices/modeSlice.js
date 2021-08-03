import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: true,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { changeMode } = modeSlice.actions;

export const selectIsDarkMode = (state) => state.mode.isDark;

export default modeSlice.reducer;
