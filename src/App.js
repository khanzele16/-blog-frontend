import React from 'react'
import Toaster from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import './App.css'
import Ads from './Components/Ads/Ads'
import Header from './Components/Header/Header'
import Auth from './Components/Modals/Auth/Auth'
import Edit from './Components/Modals/Edit/Edit'
import Plus from './Components/Modals/Plus/Plus'
import Full from './Components/Posts/Full/Full'
import Sidebar from './Components/Sidebar/Sidebar'
import Community from './Pages/Community/Community'
import Discovery from './Pages/Discovery/Discovery'
import Feed from './Pages/Feed/Feed'
import NotFound from './Pages/NotFound/NotFound'
import Blog from './Pages/Settings/Other/Blog/Blog'
import Feeds from './Pages/Settings/Other/Feeds/Feeds'
import General from './Pages/Settings/Other/General/General'
import SNotifications from './Pages/Settings/Other/SNotifications/SNotifications'
import Settings from './Pages/Settings/Settings'
import Subscriptions from './Pages/Subscriptions/Subscriptions'
import User from './Pages/User/User'
import { selectIsAuth } from './Redux/Slices/authSlice'
import { getReactions } from './Redux/Slices/reactionsSlice'
import UmarState from './Components/HPanel/UmarState'

function App() {
	const authButton = React.useRef()
	const isAuth = useSelector(selectIsAuth)
	const navigate = useNavigate()
	const [modalParams, setModalParams] = useSearchParams()
	const [searchParams, setSearchParams] = React.useState(
		new URLSearchParams(window.location.search)
	)
	const dispatch = useDispatch()
	React.useEffect(() => {
		dispatch(getReactions())
	}, [])
	React.useEffect(() => {
		if (modalParams.get('modal')) {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: hidden; margin-right: 15px'
		} else {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: scroll; margin-right: 0px'
		}
	}, [modalParams])
	return (
		<div className='App'>
			{modalParams.get('modal') == 'auth' ? (
				isAuth ? (
					navigate('/feed')
				) : (
					<Auth
						authButton={authButton}
						setModalParams={event => setModalParams(event)}
					/>
				)
			) : modalParams.get('modal') == 'edit' ? (
				<Edit setModalParams={event => setModalParams(event)} />
			) : modalParams.get('modal') == 'plus' ? (
				<Plus setModalParams={event => setModalParams(event)} />
			) : (
				''
			)}
			{
				<div
					onClick={() => searchParams.get('modal', 'auth')}
					className='App-ads'
				>
					<Ads />
				</div>
			}
			<header>
				<Header authButton={authButton} />
			</header>
			<div className='App-content'>
				<Sidebar />
				<div className='App-content-main'>
					<Routes>
						<Route path='/feed' element={<Feed />} />
						<Route path='/subscriptions' element={<Subscriptions />} />
						<Route path='/discovery' element={<Discovery />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/settings/blog' element={<Blog />} />
						<Route path='/settings/feeds' element={<Feeds />} />
						<Route path='/settings/general' element={<General />} />
						<Route
							path='/settings/notifications'
							element={<SNotifications />}
						/>
						<Route path='/u/:username/*' element={<User />} />
						<Route path='/c/:nickname/*' element={<Community />} />
						<Route path='/post/:id' element={<Full />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
				<div className='App-content-aside'>
					<UmarState />
				</div>
			</div>
		</div>
	)
}

export default App
