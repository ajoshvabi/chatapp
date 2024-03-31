// // authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// // Define the initial state for authentication
const initialState = {
  chatdata: {}, // Replace with your initial token
};

// Create an authentication slice using createSlice from Redux Toolkit
export const newchatSlice = createSlice({
  name: 'newchat', // Name of the slice
  initialState, // Initial state
  reducers: {
    setChat: (state, action) => {
        state.chatdata = action.payload;
        // console.log(state.chatdata);
    },
  },
});

// Extract the action creator
export const { setChat } = newchatSlice.actions;

// Export the reducer function
export default newchatSlice.reducer;
