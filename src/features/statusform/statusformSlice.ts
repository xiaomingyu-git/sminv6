import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';
import { fileStatus } from '../../serivces/api';
export interface StatusformState {
  value: {};
}

const initialState: StatusformState = {
  value: { data: [], success: true, total: 0 },
  status: 'idle',
};
export const statusformAsync = createAsyncThunk(
  'statusform/tableread',
  async (value:any) => {
    console.log(value)
    const response = await fileStatus(value.receiveTimeStart,value.receiveTimeEnd);
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);
export const statusformSlice = createSlice({
  name: 'statusform',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(statusformAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(statusformAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.value = { ...action.payload };
      });
  },
});

// Action creators are generated for each case reducer function
export const { changePage } = statusformSlice.actions;
export const selectstatusform = (state: AppState) => state.statusform;
export default statusformSlice.reducer;