import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'
import {readeditableTable,changeFirstTablelist,postFilebyidList,removeSecTablelist} from '../../serivces/api'
export interface SidetableState {
	value: {data:Array<object>,success:boolean,total:number},
	pagination:{total:number,pageSize:number,current:number},
    selectedRowKeys:[],
	status: 'idle' | 'loading' | 'failed'
}

const initialState: SidetableState = {
	value: {data: []},
	pagination: {pageSize:50,current:1},
    selectedRowKeys:[],
	status: 'idle',
}
export const removesecfileAsync = createAsyncThunk(
    'maintable/remove',
    async (values: any, {getState}) => {
		const stateAfter = getState ()
		const response = await removeSecTablelist ({'id':values})
		return response
	}
  )
export const sidetableAsync = createAsyncThunk(
    'sidetable/tableread',
    async (values: any, {getState}) => {
		const stateAfter = getState ()
        const newvalues = {...values}
        newvalues.pageSize = (stateAfter as  any).sidetable.pagination.pageSize
        newvalues.current = (stateAfter as  any).sidetable.pagination.current
		const response = await readeditableTable (newvalues)
        response.upid = values
		return response
	}
  )

  export const finishtableAsync = createAsyncThunk(
    'sidetable/finishtable',
    async (values: any, {getState}) => {
		const stateAfter = getState ()
		const response = await changeFirstTablelist (values)
		return response
	}
  )
export const sidetableSlice = createSlice({
  name: 'sidetable',
  initialState,
  reducers: {
    changePage: (state, action) => {
        state.pagination = action.payload
    },
    changesideSelectedKey: (state, action) => {
        state.selectedRowKeys = action.payload
    },
},
  extraReducers: (builder) => {
    builder
      .addCase(sidetableAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(sidetableAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.pagination.total = action.payload.total
        state.value = {...action.payload}
      })
      .addCase(finishtableAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(finishtableAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        console.log(action.payload)
      })
  },
})

// Action creators are generated for each case reducer function
export const {changePage,changesideSelectedKey } = sidetableSlice.actions
export const selectSidetable = (state: AppState) => state.sidetable
export default sidetableSlice.reducer