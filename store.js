import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './src/features/counter/counterSlice.js'
import restaurantReducer from './src/features/counter/restaurantSlice.js'

export const store = configureStore({
  reducer: {
    basket: counterReducer,
    restaurant: restaurantReducer,
  },
})