import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    token: null,
    profilePicture: null,
    theme: "light",
    notificationsEnabled: true,
    email: null,
    userId: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.userId = action.payload.userId;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.email = null;
      state.value.userId = null;
    },
    savesetting: (state, action) => {
      state.value.profilePicture = action.payload.profilePicture;
      state.value.theme = action.payload.theme;
      state.value.notificationsEnabled = action.payload.notificationsEnabled;
    },
    // updateUser: (state, action) => {
    //   if (action.payload.email) {
    //     state.value.email = action.payload.email;
    //   }
    //   if (action.payload.userId) {
    //     state.value.userId = action.payload.userId;
    //   }
    // },
  },
});

export const { login, logout, savesetting, updateUser } = userSlice.actions;
export default userSlice.reducer;
