import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { sessions: [] }, 
};

const createSessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    addSession: (state, action) => {
      state.value.sessions.push(action.payload);  
    },
    setSessions: (state, action) => {
      state.value.sessions = action.payload;  
    },
    updateSession: (state, action) => {
      state.value.sessions = state.value.sessions.map((session) =>
        session._id === action.payload._id ? action.payload : session);
    },
    deleteSession: (state, action) => {
      state.sessions = state.sessions.filter(
        (session) => session._id !== action.payload._id);
    },
  },
});


export const { addSession, setSessions, updateSession, deleteSession } = createSessionSlice.actions;
export default createSessionSlice.reducer;
