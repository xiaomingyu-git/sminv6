import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
  getFirstTableDelaybyid,
  modifyDelayFirstTablelist,
  modifyFirstTablelist,
  modifySecTablelist
} from "../../serivces/api";
import {AppState} from '../../app/store'
import moment from 'moment'
export interface DelayModalState {
  value:any
  status: 'idle' | 'loading' | 'failed'
  visible: true|false
  title:string
  deadlineTime:Date,
  createdTime:string
}

const initialState: DelayModalState = {
  value: [],
  status: 'idle',
  visible:false,
}
export const delaymodalAsync = createAsyncThunk(
  'delaymodal/delaymodalAsync',
  async (values:any) => {
    console.log(values)
    if (values.delayTime1 === 'Invalid date' || values.delayTime1 == null){
      values.delayTime1 ='0000-00-00'
    } else {
      values.delayTime1 = moment (values.delayTime1).utcOffset(480).format('YYYY-MM-DD');
    }
    if (values.delayTime2 === 'Invalid date' || values.delayTime2 == null){
      values.delayTime2 ='0000-00-00'
    } else {
      values.delayTime2 = moment (values.delayTime2).utcOffset(480).format('YYYY-MM-DD');
    }
    if (values.delayTime3 === 'Invalid date' || values.delayTime3 == null){
      values.delayTime3 ='0000-00-00'
    } else {
      values.delayTime3 = moment (values.delayTime3).utcOffset(480).format('YYYY-MM-DD');
    }
    const response = await modifyDelayFirstTablelist(values)
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const delaymodalgetAsync = createAsyncThunk(
  'delaymodal/delaymodalgetAsync',
  async (values:any) => {
    const response = await getFirstTableDelaybyid(values)
    // The value we return becomes the `fulfilled` action payload
    console.log(response)
    return response
  }
)

export const delaymodalSlice = createSlice({
  name:'delaymodal',
  initialState,
  reducers:{
    showdelayModal:(state) =>{
      state.visible = true
      console.log('showdelayModal')
      console.log(state.visible)
    },
    hidedelayModal:(state) =>{
      state.visible = false
    },
    setdelayformValue: (state, action) => {
      const newpayload =action.payload
      state.value =newpayload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(delaymodalAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(delaymodalAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.visible = false
      })
      .addCase(delaymodalAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(delaymodalgetAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(delaymodalgetAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.visible = false
      })
      .addCase(delaymodalgetAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})
export const { showdelayModal,hidedelayModal,setdelayformValue  } = delaymodalSlice.actions
export const selectdelayModal = (state:AppState) => state.delaymodal
export default delaymodalSlice.reducer
