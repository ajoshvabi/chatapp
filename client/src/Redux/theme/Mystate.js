import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'darkThem',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changetheme: (state) => {
      console.log(state);
    document.body.className=state.value = state.value === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    console.log(state.value);
    },
  },
})

// Action creators are generated for each case reducer function
export const { changetheme } = themeSlice.actions

export default themeSlice.reducer