import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from './../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async params => {
	const { data } = await axios.get(
		`/posts?limit=${params.limit}&skip=${params.skip}${
			params.username ? `&username=${params.username}` : ''
		}${params.nickname ? `&nickname=${params.nickname}` : ''}`
	)
	return data
})

export const fetchPost = createAsyncThunk('posts/fetchPost', async params => {
	const { data } = await axios.get(`/post/${params.id}`)
	return data
})

export const reactPost = createAsyncThunk('posts/reactPost', async params => {
	const { data } = await axios.get(
		`/react?postId=${params.postId}&reactionId=${params.reactionId}`
	)
	return data
})

export const deletePost = createAsyncThunk('posts/deletePost', async params => {
	const { data } = await axios.delete(`/post/${params.id}`)
	return data
})

const initialState = {
	pData: null,
	firstFetchStatus: 'loading',
	lazyFetchStatus: 'loading',
	hasMore: null,
	one: {
		data: null,
		status: 'loading',
	},
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		reactPPost(state, action) {
			state.pData
				?.filter(obj => obj._id == action.payload.id)
				?.map(el => (el.reactions = action.payload.reactions))
		},
		clearPData(state) {
			state.pData = null
		},
		subscriptionPost(state, action) {
			state.pData
				?.filter(obj => obj.author._id == action.payload.id)
				?.map(el => (el.author.isSubscribed = action.payload.subscribed))
		},
		deletePPost(state, action) {
			for (var i = state?.pData?.length - 1; i >= 0; i--) {
				if (state.pData[i]._id.toString() == action.payload.id.toString()) {
					state.pData.splice(i, 1)
				}
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, state => {
			if (!state.pData) {
				state.pData = null
				state.firstFetchStatus = 'loading'
			} else {
				state.lazyFetchStatus = 'loading'
			}
		})
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			if (!state.pData) {
				state.pData = [...action.payload.data]
				state.firstFetchStatus = 'loaded'
				state.hasMore = action.payload.postsLength
			} else {
				state.lazyFetchStatus = 'loaded'
				state.pData = [...state.pData, ...action.payload.data]
				state.hasMore = action.payload.postsLength
			}
		})
		builder.addCase(fetchPosts.rejected, state => {
			if (!state.pData) {
				state.pData = null
				state.firstFetchStatus = 'error'
			} else {
				state.lazyFetchStatus = 'error'
			}
		})
		builder.addCase(fetchPost.pending, state => {
			state.one.data = null
			state.one.status = 'loading'
		})
		builder.addCase(fetchPost.fulfilled, (state, action) => {
			state.one.data = action.payload
			state.one.status = 'loaded'
		})
		builder.addCase(fetchPost.rejected, state => {
			state.one.data = null
			state.one.status = 'error'
		})
	},
})

export const { clearPData, subscriptionPost, deletePPost, reactPPost } =
	postsSlice.actions
export default postsSlice.reducer
