import React from 'react'
import { NavLink } from 'react-router-dom'
import './Statistic.css'

function Statistic({
	blog,
	render,
	setIsSubscribers,
	setIsSubscriptions,
	subButton,
}) {
	const statisticModal = React.useRef()
	React.useEffect(() => {
		const handleClickListener = event => {
			if (
				!event.composedPath().includes(statisticModal.current) &
				!event.composedPath().includes(subButton.current)
			) {
				if (blog?.isUser) {
					setIsSubscribers(false)
					setIsSubscriptions(false)
				} else {
					setIsSubscribers(false)
				}
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	console.log(blog)
	return (
		<div className='Statistic'>
			<div ref={statisticModal} className='Statistic-content'>
				<div className='Statistic-content-title'>
					<p>{render == 'subscribers' ? 'Подписчики' : 'Подписки'}</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						onClick={() => {
							if (blog?.isUser) {
								setIsSubscribers(false)
								setIsSubscriptions(false)
							} else {
								setIsSubscribers(false)
							}
						}}
					>
						<path
							d='M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z'
							fill='#969c9d'
						/>
					</svg>
				</div>
				<ul className='Statistic-content-list'>
					{render == 'subscribers' &&
						blog?.subscribers?.length != 0 &&
						blog?.subscribers?.map((el, index) => (
							<NavLink
								onClick={() => {
									setIsSubscribers(false)
									setIsSubscriptions(false)
								}}
								to={`/u/${el.username}/posts`}
							>
								<li key={index}>
									<img src={el.avatarUrl} alt='' />
									<p>{el.name}</p>
								</li>
							</NavLink>
						))}
					{render == 'subscriptions' &&
						blog?.subscriptions?.length != 0 &&
						blog?.subscriptions?.map((el, index) => (
							<NavLink
								onClick={() => {
									setIsSubscribers(false)
									setIsSubscriptions(false)
								}}
								to={`/${el.isUser ? 'u' : 'c'}/${
									el.isUser && el.username
								}/posts`}
							>
								<li key={index}>
									<img src={el.avatarUrl} alt='' />
									<p>{el.name}</p>
								</li>
							</NavLink>
						))}
					{render == 'subscribers' && blog?.subscribers?.length == 0 && (
						<div id='statistic-subscribers-none'>
							<img
								src='https://emojigraph.org/media/apple/man-shrugging_1f937-200d-2642-fe0f.png'
								alt=''
							/>
							<p>
								Тут нет никого.
								<br />
							</p>
						</div>
					)}
					{render == 'subscriptions' && blog?.subscriptions?.length == 0 && (
						<div id='statistic-subscribers-none'>
							<img
								src='https://emojigraph.org/media/apple/man-shrugging_1f937-200d-2642-fe0f.png'
								alt=''
							/>
							<p>Тут нет никого.</p>
						</div>
					)}
				</ul>
			</div>
		</div>
	)
}

export default Statistic
