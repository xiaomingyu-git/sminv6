import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';
import { fileTime } from '../../serivces/api';
export interface LeaderformState {
  value: {};
}

const initialState: LeaderformState = {
  value: { data: [], success: true, total: 0 },
  status: 'idle',
};
export const leaderformAsync = createAsyncThunk(
  'leaderform/tableread',
  async (value:any) => {
    console.log(value)
    const response = await fileTime(value.receiveTimeStart,value.receiveTimeEnd);
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);
export const leaderformSlice = createSlice({
  name: 'leaderform',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(leaderformAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(leaderformAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.value = { ...action.payload };
      });
  },
});

// Action creators are generated for each case reducer function
export const { changePage } = leaderformSlice.actions;
export const selectleaderForm = (state: AppState) => state.leaderform;
export default leaderformSlice.reducer;
