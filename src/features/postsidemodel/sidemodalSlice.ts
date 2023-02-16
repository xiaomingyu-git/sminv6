import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {modifyFirstTablelist,modifySecTablelist} from '../../serivces/api'
import {AppState} from '../../app/store'
import moment from 'moment'
export interface sideModalState {
	value:any
	status: 'idle' | 'loading' | 'failed'
	visible: true|false
	title:string
    deadlineTime:Date,
    createdTime:string
}

const initialState: sideModalState = {
	value: [],
	status: 'idle',
	visible:false,
}
export const sidemodalAsync = createAsyncThunk(
	'sidemodal/sidemodalAsync',
	async (values:any) => {
        console.log('sidemodalAsync')
        console.log(values)
		const response = await modifySecTablelist(values)
		// The value we return becomes the `fulfilled` action payload
		console.log(response)
		return response
	}
)

export const sidemodalSlice = createSlice({
	name:'sidemodal',
	initialState,
	reducers:{
		showsideModal:(state) =>{
			state.visible = true
		},
		hidesideModal:(state) =>{
			state.visible = false
		},
        setsidemodalformValue: (state, action) => {
            const newpayload =action.payload
            state.value =newpayload
            console.log( state.value)
        },
	},
	extraReducers: (builder) => {
		builder
			.addCase(sidemodalAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(sidemodalAsync.fulfilled, (state, action) => {
				action.payload = {success:true,title:'编辑项目'}
				return {status: 'idle',...action.payload}
			})
			.addCase(sidemodalAsync.rejected, (state) => {
				state.status = 'failed'
			})
	},
})
export const { showsideModal,hidesideModal,setsidemodalformValue  } = sidemodalSlice.actions
export const selectsideModal = (state:AppState) => state.sidemodal
export default sidemodalSlice.reducer