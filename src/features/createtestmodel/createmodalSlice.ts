import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createFirstTablelist,readFirstTablenextFileCode} from '../../serivces/api'
import {AppState} from '../../app/store'
import moment from 'moment'
export interface createModalState {
	value:any
	status: 'idle' | 'loading' | 'failed'
	visible: true|false
	title:string
    deadlineTime:Date,
    createdTime:string
}

const initialState: createModalState = {
	value: [],
	status: 'idle',
	visible:false,
}
export const createmodalAsync = createAsyncThunk(
	'createmodal/createmodalAsync',
	async (values:any) => {
		const response = await createFirstTablelist(values)
		// The value we return becomes the `fulfilled` action payload
		console.log(response)
		return response
	}
)
export const createmodalnumberAsync = createAsyncThunk(
	'createmodal/createmodalnumberAsync',
	async (values:any) => {
		const response = await readFirstTablenextFileCode(values)
		// The value we return becomes the `fulfilled` action payload
		console.log(response)
		return response
	}
)
export const createmodalSlice = createSlice({
	name:'createmodal',
	initialState,
	reducers:{
		showcreateModal:(state) =>{
			state.visible = true
		},
		hidecreateModal:(state) =>{
			state.visible = false
		},
        setformValue: (state, action) => {
            const newpayload =action.payload
            newpayload.docNumbers =1
            state.value =newpayload
        },
	},
	extraReducers: (builder) => {
		builder
			.addCase(createmodalAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createmodalAsync.fulfilled, (state, action) => {
				action.payload = {success:true,title:'新增项目'}
				return {status: 'idle'}
			})
			.addCase(createmodalAsync.rejected, (state) => {
				state.status = 'failed'
			})
            .addCase(createmodalnumberAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createmodalnumberAsync.fulfilled, (state, action) => {
                state.status = 'idle'

			})
			.addCase(createmodalnumberAsync.rejected, (state) => {
				state.status = 'failed'
			})
	},
})
export const { showcreateModal,hidecreateModal,setformValue  } = createmodalSlice.actions
export const selectcreateModal = (state:AppState) => state.createmodal
export default createmodalSlice.reducer