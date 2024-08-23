import React from 'react'
import './Views.css'

function Views({ reactions, viewsButton, setIsViews, counter }) {
	const viewsModal = React.useRef()
	React.useEffect(() => {
		const handleClickListener = event => {
			if (
				!event.composedPath().includes(viewsModal.current) &
				!event.composedPath().includes(viewsButton.current)
			) {
				setIsViews(false)
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<div className='Views'>
			<div ref={viewsModal} className='Views-content'>
				<div className='Views-content-title'>
					<p>Статистика</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						onClick={() => setIsViews(false)}
					>
						<path
							d='M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z'
							fill='#969c9d'
						/>
					</svg>
				</div>
				<div className='Views-content-info'>
					<div className='Views-content-info-feed'>
						<p id='views-info-feed-num'>{counter?.feedViewsCount}</p>
						<p id='views-info-feed-about'>показов в лентах</p>
					</div>
					<div className='Views-content-info-full'>
						<p id='views-info-full-num'>{counter?.fullViewsCount}</p>
						<p id='views-info-full-about'>открытий поста</p>
					</div>
					<div className='Views-content-info-reactions'>
						<p id='views-info-reactions-num'>
							{reactions.reduce((prev, reaction) => prev + reaction.count, 0)}
						</p>
						<p id='views-info-reactions-about'>количество реакций</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Views
