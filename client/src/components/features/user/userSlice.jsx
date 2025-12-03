import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem('user')) || null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: userFromStorage,
    status: 'idle',
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.status = 'succeeded';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      state.status = 'idle';
      localStorage.removeItem('user');
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { login, logout, setStatus } = userSlice.actions;
export default userSlice.reducer;
