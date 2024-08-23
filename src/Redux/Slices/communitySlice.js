import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from './../../axios'

export const fetchCommunities = createAsyncThunk(
	'cData/fetchCommunities',
	async params => {
		const { data } = await axios.get(`/communities?skip=${params.skip}`)
		return data
	}
)
export const getCommunity = createAsyncThunk(
	'cData/getCommunity',
	async params => {
		const { data } = await axios.get(`/community/${params.nickname}`)
		return data
	}
)

const initialState = {
	cData: null,
	firstFetchStatus: 'loading',
	lazyFetchStatus: 'loading',
	hasMore: null,
	one: {
		data: null,
		status: 'loading',
	},
}

const communitySlice = createSlice({
	name: 'community',
	initialState,
	reducers: {
		clearCommunities: state => {
			state.cData = null
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchCommunities.pending, state => {
			if (!state.cData) {
				state.cData = null

				state.firstFetchStatus = 'loading'
			} else {
				state.lazyFetchStatus = 'loading'
			}
		})
		builder.addCase(fetchCommunities.fulfilled, (state, action) => {
			if (!state.cData) {
				state.cData = [...action.payload.data]
				state.firstFetchStatus = 'loaded'
				state.hasMore = action.payload.communityLength
			} else {
				state.lazyFetchStatus = 'loaded'
				state.cData = [...state.cData, ...action.payload.data]
				state.hasMore = action.payload.communityLength
			}
		})
		builder.addCase(fetchCommunities.rejected, state => {
			if (!state.cData) {
				state.cData = null
				state.firstFetchStatus = 'error'
			} else {
				state.cData = null
				state.lazyFetchStatus = 'error'
			}
		})
		builder.addCase(getCommunity.pending, state => {
			state.one.data = null
			state.one.status = 'loading'
		})
		builder.addCase(getCommunity.fulfilled, (state, action) => {
			state.one.data = action.payload
			state.one.status = 'loaded'
		})
		builder.addCase(getCommunity.rejected, state => {
			state.one.data = null
			state.one.status = 'error'

		})
	},
})
export const { clearCommunities } = communitySlice.actions
export default communitySlice.reducer
