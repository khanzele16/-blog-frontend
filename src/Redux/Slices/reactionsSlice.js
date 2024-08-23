import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from './../../axios'

export const getReactions = createAsyncThunk(
	'reactions/getReactions',
	async () => {
		const { data } = await axios.get('/reactions')
		return data
	}
)

const initialState = {
	reactions: null,
}

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState,
	extraReducers: builder => {
		builder.addCase(getReactions.pending, state => {
			state.reactions = null
		})
		builder.addCase(getReactions.fulfilled, (state, action) => {
			state.reactions = action.payload
		})
		builder.addCase(getReactions.rejected, state => {
			state.reactions = null
		})
	},
})

export default reactionsSlice.reducer
