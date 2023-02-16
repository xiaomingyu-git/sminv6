import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'
import {readFirstTable} from '../../serivces/api'
export interface FormState {
	value: { },
}

const initialState: formState = {
  value: {data: [], success: true, total: 0},
	pagination: {value: 1, pageSize: 50},
	status: 'idle',
  listvalue:{}
}
export const formAsync = createAsyncThunk(
    'form/tableread',
    async (amount: number) => {
      const response = await readFirstTable(amount)
      // The value we return becomes the `fulfilled` action payload
      return response
    }
  )
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeForm: (state, action) => {
        state.listvalue = action.payload
    },

},
  extraReducers: (builder) => {
    builder
      .addCase(formAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(formAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        console.log(action.payload)
        state.value = {...action.payload}
      })
  },
})

// Action creators are generated for each case reducer function
export const {changeForm } = formSlice.actions
export const selectForm = (state: AppState) => state.form
export default formSlice.reducer