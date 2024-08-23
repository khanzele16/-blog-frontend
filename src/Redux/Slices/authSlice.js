import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from './../../axios'

export const loginUser = createAsyncThunk('data/loginUser', async params => {
	const { data } = await axios.post('/auth/login', params)
	return data
})

export const authMe = createAsyncThunk('data/authMe', async () => {
	if (window.localStorage.getItem('token')) {
		const { data } = await axios.get('/auth/me')
		return data
	}
	return null
})

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async params => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)

const initialState = {
	uData: null,
	status: 'loading',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutUData: state => {
			state.uData = null
		},
	},
	extraReducers: builder => {
		builder.addCase(loginUser.pending, state => {
			state.uData = null
			state.status = 'loading'
		})
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.uData = action.payload.uData
			state.status = 'loaded'
		})
		builder.addCase(loginUser.rejected, state => {
			state.uData = null
			state.status = 'error'
		})
		builder.addCase(authMe.pending, state => {
			state.uData = null
			state.status = 'loading'
		})
		builder.addCase(authMe.fulfilled, (state, action) => {
			state.uData = action.payload
			state.status = 'loaded'
		})
		builder.addCase(authMe.rejected, state => {
			state.uData = null
			state.status = 'error'
		})
	},
})

export const { logoutUData } = authSlice.actions
export const selectIsAuth = state => Boolean(state.auth.uData)
export default authSlice.reducer
