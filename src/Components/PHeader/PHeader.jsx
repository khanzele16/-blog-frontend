import moment from 'moment'
import 'moment/locale/ru'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { selectIsAuth } from '../../Redux/Slices/authSlice'
import { subscriptionPost } from '../../Redux/Slices/postsSlice'
import { subscription } from '../../Redux/Slices/userSlice'
import { dotsCatalog } from './../../utils/postDots.js'
import './PHeader.css'

function PHeader({ post, setDeleteAlert }) {
	const [isDots, setIsDots] = React.useState(false)
	const me = useSelector(state => state.auth.uData)
	const dotsButton = React.useRef()
	const dotsUl = React.useRef()
	const navigate = useNavigate()
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	async function handleSubscription() {
		if (isAuth) {
			const result = await dispatch(subscription({ id: post?.author?._id }))
			dispatch(subscriptionPost(result.payload))
		} else {
			navigate('?modal=auth')
		}
	}
	React.useEffect(() => {
		const handleClickListener = event => {
			if (
				!event.composedPath().includes(dotsUl.current) &&
				!event.composedPath().includes(dotsButton.current)
			) {
				setIsDots(false)
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<div className='PHeader'>
			{post?.subsite ? (
				<NavLink to={`/u/${post?.author?.username}/posts`}>
					<div className='PHeader-author-subsite'>
						<div id='pheader-subsite-avatars'>
							<img
								id='pheader-subsite-avatars-author'
								src={post?.author?.avatarUrl}
								alt=''
							/>
							<NavLink to={`/c/${post?.subsite?.nickname}/posts`}>
								<img
									id='pheader-subsite-avatars-community'
									src={post?.subsite?.avatarUrl}
									alt=''
								/>
							</NavLink>
						</div>
						<div className='PHeader-author-details'>
							<p id='author-details-name'>{post?.author?.name}</p>

							<div id='author-details-other'>
								<NavLink to={`/c/${post?.subsite?.nickname}/posts`}>
									<p id='author-details-other-community'>
										{post?.subsite?.name}
									</p>
								</NavLink>
								<p
									title={moment(post?.createdAt).format('DD.MM.YYYY в HH:MM')}
									id='author-details-other-date'
								>
									{moment(post?.createdAt).fromNow()}
								</p>
							</div>
						</div>
					</div>
				</NavLink>
			) : (
				<div className='PHeader-author'>
					<img src={post?.author?.avatarUrl} alt='' />
					<div className='PHeader-author-details'>
						<p id='author-details-name'>{post?.author?.name}</p>
						<p id='author-details-date'>{moment(post?.createdAt).fromNow()}</p>
					</div>
				</div>
			)}
			<div className='PHeader-menu'>
				<div className='PHeader-menu-buttons'>
					{!(
						post?.author?.isSubscribed || me?.username == post?.author?.username
					) && (
						<button
							onClick={() => handleSubscription()}
							id='pheader-menu-subscribe'
						>
							Подписаться
						</button>
					)}
					<button
						ref={dotsButton}
						id='pheader-menu-dots'
						onClick={() => setIsDots(!isDots)}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
								stroke='#969c9d'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z'
								stroke='#969c9d'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z'
								stroke='#969c9d'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					{isDots ? (
						<ul ref={dotsUl} className='PHeader-dots-catalog'>
							{dotsCatalog(post)?.map(
								(el, index) =>
									el?.isExist && (
										<li
											onClick={
												el?.action == 'delete' ? () => setDeleteAlert(true) : ''
											}
											id='dots-preview-catalog-li'
											key={index}
										>
											{el?.icon}
											<p>{el?.name}</p>
										</li>
									)
							)}
						</ul>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}

export default PHeader
