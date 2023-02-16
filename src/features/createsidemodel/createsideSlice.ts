import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createSecTablelist,readFirstTablenextFileCode} from '../../serivces/api'
import {AppState} from '../../app/store'
import moment from 'moment'
export interface createSideState {
	value:any
	status: 'idle' | 'loading' | 'failed'
	visible: true|false
	title:string
    expectFinishTime:Date,
    createdTime:string
}

const initialState: createSideState = {
	value: [],
	status: 'idle',
	visible:false,
}
export const createsideAsync = createAsyncThunk(
	'createside/createsideAsync',
	async (values:any) => {
		const response = await createSecTablelist(values)
		// The value we return becomes the `fulfilled` action payload
		console.log(values)
		return response
	}
)
export const createsideSlice = createSlice({
	name:'createside',
	initialState,
	reducers:{
		showcreateside:(state) =>{
			state.visible = true
		},
		hidecreateside:(state) =>{
			state.visible = false
		},
        setsidecreateformValue: (state, action) => {
            const newpayload =action.payload
            console.log(action.payload.id)
            state.value ={upid:action.payload.id,id:0}
        },
	},
	extraReducers: (builder) => {
		builder
			.addCase(createsideAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createsideAsync.fulfilled, (state, action) => {
				action.payload = {success:true,title:'新增项目'}
				return {status: 'idle',...action.payload}
			})
			.addCase(createsideAsync.rejected, (state) => {
				state.status = 'failed'
			})
	},
})
export const { showcreateside,hidecreateside,setsidecreateformValue  } = createsideSlice.actions
export const selectcreateside = (state:AppState) => state.createside
export default createsideSlice.reducer