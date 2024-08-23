import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../Redux/Slices/authSlice'
import { reactPost, reactPPost } from '../../Redux/Slices/postsSlice'
import './Reactions.css'
import toast from 'react-hot-toast'

function Reactions({ post }) {
	const [isReactions, setIsReactions] = React.useState(false)
	const reactionsButton = React.useRef()
	const reactionsUl = React.useRef()
	const reactions = useSelector(state => state.reactions.reactions)
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const me = useSelector(state => state.auth.uData)
	async function handleReactPost(reactionId) {
		if (isAuth && post.author._id !== me._id) {
			const result = await dispatch(
				reactPost({ postId: post?._id, reactionId })
			)
			dispatch(reactPPost(result.payload))
		}
		if (post.author._id !== me._id) {
			toast.error('Нельзя ставить реакции себе!')
		}
	}
	React.useEffect(() => {
		const handleClickListener = event => {
			if (
				!event.composedPath().includes(reactionsUl.current) &&
				!event.composedPath().includes(reactionsButton.current)
			) {
				setIsReactions(false)
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<ul className='Reactions'>
			{post?.reactions?.counters
				?.filter(el => el.count > 0)
				?.map((el, index) => (
					<li
						onClick={() => handleReactPost(el.id)}
						id={
							el.id === post.reactions.reactionId
								? 'reactions-li-active'
								: 'reactions-li'
						}
						key={index}
					>
						<img src={reactions.find(obj => obj.id == el.id).src} alt='' />
						<p>{el?.count}</p>
					</li>
				))}
			<div className='Reactions-add'>
				{post.reactions?.counters.reduce(
					(prev, reaction) => reaction.count + prev,
					0
				) === 0 && (
					<div
						onClick={() => (isAuth ? handleReactPost(1) : '')}
						id='reactions-add-heart'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z'
								stroke='#969c9d'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				)}
				<div id='reactions-add-block'>
					<div
						onClick={() => setIsReactions(!isReactions)}
						ref={reactionsButton}
						id='reactions-add-block-li'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								d='M6 12H18M12 6V18'
								stroke='#969c9d'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
					{isReactions && (
						<ul
							onClick={() => setIsReactions(false)}
							ref={reactionsUl}
							id='reactions-add-block-catalog'
						>
							{reactions.map((el, index) => (
								<li
									onClick={() => (isAuth ? handleReactPost(el.id) : '')}
									key={index}
								>
									<img src={el.src} alt='' />
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</ul>
	)
}

export default Reactions
