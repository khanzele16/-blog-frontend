import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { authMe, selectIsAuth } from '../../Redux/Slices/authSlice'
import Notifications from '../Notifications/Notifications'
import Profile from '../Profile/Profile'
import './Header.css'

function Header({ authButton }) {
	const [isSearching, setIsSearching] = React.useState(false)
	const searchInput = React.useRef()
	const status = useSelector(state => state.auth.status)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	React.useEffect(() => {
		dispatch(authMe())
	}, [])
	const isAuth = useSelector(selectIsAuth)
	const uData = useSelector(state => state.auth.uData)
	React.useEffect(() => {
		const handleClickListener = event => {
			if (!event.composedPath().includes(searchInput.current)) {
				setIsSearching(false)
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<div className='Header'>
			<div className='Header-title'>
				<NavLink to='/feed'>
					<h1>.blog</h1>
				</NavLink>
			</div>
			{status == 'loading' ? (
				<></>
			) : (
				<div className='Header-control'>
					<div ref={searchInput} className='Header-control-search'>
						<div
							className={
								isSearching ? 'control-search-active' : 'control-search'
							}
						>
							<svg id='icon-search-inner' fill='#969da0'>
								<g>
									<path d='m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z'></path>
								</g>
							</svg>
							<input id='control-input' type='text' placeholder='Поиск' />
						</div>
						<button
							onClick={() => {
								setIsSearching(true)
								document.getElementById('control-input').focus()
							}}
							id='btn-search'
						>
							<svg id='icon-search-btn'>
								<g>
									<path d='m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z'></path>
								</g>
							</svg>
						</button>
					</div>
					{isAuth ? <Notifications /> : ''}
					<div className='Header-control-auth'>
						<button onClick={() => navigate('?modal=auth')} id='auth-write'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='white'
								viewBox='0 0 24 24'
							>
								<path d='M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z' />
							</svg>
							Написать
						</button>
						{isAuth ? (
							<Profile uData={uData} />
						) : (
							<button
								ref={authButton}
								onClick={() => navigate('?modal=auth')}
								id='auth-login'
							>
								Войти
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Header
