import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'
import {readFirstTable} from '../../serivces/api'
export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}
export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
      const response = await readFirstTable(amount)
      // The value we return becomes the `fulfilled` action payload
      return response.data
    }
  )
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value += action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer