import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    token: null,
    profilePicture: null,
    theme: "light",
    notificationsEnabled: true,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
       state.value.token = action.payload.token;
       state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
    savesetting: (state, action) => {
      state.value.profilePicture = action.payload.profilePicture;
      state.value.theme = action.payload.theme;
      state.value.notificationsEnabled = action.payload.notificationsEnabled;
    },
  },
});

// export const { login, logout, savesetting } = userSlice.actions;
export default userSlice.reducer;
