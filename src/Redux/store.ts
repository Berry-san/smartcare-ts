import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
const store = configureStore({
  reducer: {
    counter: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
