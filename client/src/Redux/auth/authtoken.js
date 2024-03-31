// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for authentication
const initialState = {
    userId: {}, // Replace with your initial token
};

// Create an authentication slice using createSlice from Redux Toolkit
export const authSlice = createSlice({
  name: 'useridslice', // Name of the slice
  initialState, // Initial state
  reducers: {
    setUserId: (state, action) => {
      console.log(action);
      state.userId = action.payload;
      console.log("state.setUserId",state.userId);
    },
  },
});

// Extract the action creator
export const { setUserId } = authSlice.actions;

// Export the reducer function
export default authSlice.reducer;
