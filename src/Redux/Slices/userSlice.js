import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from './../../axios'

export const getUser = createAsyncThunk('data/getUser', async params => {
	const { data } = await axios.get(
		`/user/${params.username}`
	)
	return data
})

export const subscription = createAsyncThunk(
	'data/subscription',
	async params => {
		const { data } = await axios.get(`/subscribe?id=${params.id}`)
		return data
	}
)

const initialState = {
	uData: {},
	subscription: {},
	status: 'loading',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: builder => {
		builder.addCase(getUser.pending, state => {
			state.uData = null
			state.status = 'loading'
		})
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.uData = action.payload
			state.status = 'loaded'
		})
		builder.addCase(getUser.rejected, state => {
			state.uData = null
			state.status = 'error'
		})
		builder.addCase(subscription.fulfilled, (state, action) => {
			state.subscription = action.payload
		})
	},
})
export default userSlice.reducer
