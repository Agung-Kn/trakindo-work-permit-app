import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: JSON.parse(localStorage.getItem("profile")) || null,
  token: localStorage.getItem("token") || null,
  expiredAt: localStorage.getItem("expiredAt") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, profile, expiredAt } = action.payload;
      state.token = accessToken;
      state.profile = profile;
      state.expiredAt = expiredAt;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("profile", JSON.stringify(profile));
      localStorage.setItem("expiredAt", expiredAt);
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.expiredAt = null;
      localStorage.removeItem("token")
      localStorage.removeItem("profile")
      localStorage.removeItem("expiredAt");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
