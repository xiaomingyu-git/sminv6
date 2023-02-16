import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {modifyFirstTablelist} from '../../serivces/api'
import {AppState} from '../../app/store'
import moment from 'moment'
export interface TestModalState {
	value:any
	status: 'idle' | 'loading' | 'failed'
	visible: true|false
	title:string
  deadlineTime:Date,
  createdTime:string
}

const initialState: TestModalState = {
	value: [],
	status: 'idle',
	visible:false,
}
export const testmodalAsync = createAsyncThunk(
	'testmodal/testmodalAsync',
	async (values:any) => {
		console.log(values)
		if (values.deadlineTime === 'Invalid date' || values.deadlineTime == null){
			values.deadlineTime ='0000-00-00'
		} else {
			values.deadlineTime = moment (values.deadlineTime).utcOffset(480).format('YYYY-MM-DD');
		}
		if (values.deadlineTime2 === 'Invalid date' || values.deadlineTime2 == null){
			values.deadlineTime2 ='0000-00-00'
		} else {
			values.deadlineTime2 = moment (values.deadlineTime2).utcOffset(480).format('YYYY-MM-DD');
		}
		if (values.deadlineTime3 === 'Invalid date' || values.deadlineTime3 == null){
			values.deadlineTime3 ='0000-00-00'
		} else {
			values.deadlineTime3 = moment (values.deadlineTime3).utcOffset(480).format('YYYY-MM-DD');
		}
		const response = await modifyFirstTablelist(values)
		// The value we return becomes the `fulfilled` action payload
		return response
	}
)

export const testmodalSlice = createSlice({
	name:'testmodal',
	initialState,
	reducers:{
		showtestModal:(state) =>{
			state.visible = true
		},
		hidetestModal:(state) =>{
			state.visible = false
		},
    setformValue: (state, action) => {
      const newpayload =action.payload
      state.value =newpayload
    },
	},
	extraReducers: (builder) => {
		builder
			.addCase(testmodalAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(testmodalAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.visible = false
			})
			.addCase(testmodalAsync.rejected, (state) => {
				state.status = 'failed'
			})
	},
})
export const { showtestModal,hidetestModal,setformValue  } = testmodalSlice.actions
export const selecttestModal = (state:AppState) => state.testmodal
export default testmodalSlice.reducer
