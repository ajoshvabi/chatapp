import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  updatecontactdata: {}, // Replace with your initial token
};
const contactUpdateSlice = createSlice({ 
  name: 'contactupdate', 
  initialState, 
  reducers: { 
    setContactUpdateTerm: (state, action) => { 
      console.log(state);
      state.updatecontactdata= action.payload; 
    }, 
  }, 
}); 
 
export const { setContactUpdateTerm } = contactUpdateSlice.actions; 
// export const setContactUpdateTerm = (state) => state.updatecontact; 
export default contactUpdateSlice.reducer;










// import { createSlice } from '@reduxjs/toolkit';
 
// const contactUpdateSlice = createSlice({ 
//   name: 'contactupdate', 
//   initialState: '', 
//   reducers: { 
//     setContactUpdateTerm: (state, action) => { 
//       return action.payload; 
//     }, 
//   }, 
// }); 
 
// export const { setSearchTerm } = contactUpdateSlice.actions; 
// // export const setContactUpdateTerm = (state) => state.updatecontact; 
// export default contactUpdateSlice.reducer;