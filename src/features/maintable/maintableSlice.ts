import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'
import {
  readFirstTable,
  changeFirstTablelist,
  postFilebyidList,
  filePrinting,
  fileExportall,
  removeFirstTablelist,
  fileRecord,
  changeNextTablelist
} from "../../serivces/api";
export interface MaintableState {
	value: {data:Array<object>,success:boolean,total:number},
	pagination:{total:number,pageSize:number,current:number},
    selectedRowKeys:[],
    selectedRowslist:[],
	status: 'idle' | 'loading' | 'failed'
}

const initialState: MaintableState = {
	value: {data: []},
	pagination: {pageSize:50,current:1},
    selectedRowKeys:[],
    selectedRowslist:[],
	status: 'idle',
    comstatus:''
}
export const maintableAsync = createAsyncThunk(
    'maintable/tableread',
    async (values: any, {getState}) => {
		const stateAfter = getState ()
        const newvalues = {...values}
        newvalues.pageSize = (stateAfter as  any).maintable.pagination.pageSize
        newvalues.current = (stateAfter as  any).maintable.pagination.current
		const response = await readFirstTable (newvalues)
		return response
	}
  )

  export const finishtableAsync = createAsyncThunk(
    'maintable/finishtable',
    async (values: any, {getState}) => {
		const stateAfter = getState ()
		const response = await changeFirstTablelist (values)
		return response
	}
  )

export const finishtableUpdateAsync = createAsyncThunk(
  'maintable/finishtableupdate',
  async (values: any, {getState}) => {
    const stateAfter = getState ()
    const response = await changeNextTablelist (values)
    return response
  }
)
  export const filestartAsync = createAsyncThunk(
    'maintable/filestart',
    async (values: any, {getState}) => {
		const stateAfter = getState ()
		const response = await filePrinting (values)
		return response
	}
  )
  export const filesexportallAsync = createAsyncThunk(
    'maintable/filesexportall',
    async () => {
		const response = await fileExportall ()
		return response
	}
  )
  export const filesrecordlistAsync = createAsyncThunk(
    'maintable/filesrecordlist',
    async (values: any, {getState}) => {
		const response = await fileRecord (values)
		return response
	}
  )
  export const removefileAsync = createAsyncThunk(
    'maintable/remove',
    async (values: any, {getState}) => {
		const stateAfter = getState ()
		const response = await removeFirstTablelist (values)
		return response
	}
  )
export const maintableSlice = createSlice({
  name: 'maintable',
  initialState,
  reducers: {
    changePage: (state, action) => {
        state.pagination = action.payload
    },
    changeSelectedKey: (state, action) => {
        state.selectedRowKeys = action.payload
    },
    changeSelectedRowslist: (state, action) => {
      state.selectedRowslist = action.payload
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(maintableAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(maintableAsync.fulfilled, (state, action) => {
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
      .addCase(finishtableUpdateAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(finishtableUpdateAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        console.log(action.payload)
      })
  },
})

// Action creators are generated for each case reducer function
export const {changePage,changeSelectedKey,changeSelectedRowslist } = maintableSlice.actions
export const selectMaintable = (state: AppState) => state.maintable
export default maintableSlice.reducer
