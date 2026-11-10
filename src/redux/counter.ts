import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
export interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
   initialState,
  reducers: {
    increment: (state, action) => {
       state.value += 1
    },
    decrement: (state, action) => {
      state.value -= 1
    },
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer