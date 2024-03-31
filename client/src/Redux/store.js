import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './NewChat/Newchat'
import userIdReducer from './auth/authtoken'
import themeReducer from './theme/Mystate'
import contactReducer from './updatecontact/updatecontact'

export const store = configureStore({
  reducer: {
    settheme: themeReducer,
    newchat: chatReducer,
    useridstore:userIdReducer,
    updatecontact:contactReducer
  },
})