import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
import communitySlice from './Slices/communitySlice'
import postsSlice from './Slices/postsSlice'
import reactionsSlice from './Slices/reactionsSlice'
import userSlice from './Slices/userSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		user: userSlice,
		posts: postsSlice,
		reactions: reactionsSlice,
		community: communitySlice,
	},
})

export default store
