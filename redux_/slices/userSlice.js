import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infos: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.infos = [...state.infos, action.payload];
    },
    logout: (state, action) => {
      // remove user from state
      state.infos = state.infos.filter(
        (user) => user.name !== action.payload.name
      );
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUserInfos = (state) => state.user.infos;

export default userSlice.reducer;
