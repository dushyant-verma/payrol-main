import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: { email: "", password: "" } },
  reducers: {
    login: (state, { payload }) => {
      state.value = payload;
    },
    logout: (state) => {
      state.value = { email: "", password: "" };
    },
    setLayout: (state, { payload }) => {
      state.layout = payload;
    },
  },
});

export const { login, logout, setLayout } = userSlice.actions;
export default userSlice.reducer;
