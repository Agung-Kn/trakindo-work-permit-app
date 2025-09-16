import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  token: localStorage.getItem("token") || null,
  expiredAt: localStorage.getItem("expiredAt") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, expiredAt } = action.payload;
      state.token = accessToken;
      state.expiredAt = expiredAt;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("expiredAt", expiredAt);
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.expiredAt = null;
      localStorage.removeItem("token")
      localStorage.removeItem("expiredAt");
    },
  },
});

export const { setCredentials, setProfile, logout } = authSlice.actions;
export default authSlice.reducer;
