import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deletePost, deletePPost } from '../../../Redux/Slices/postsSlice'
import DeleteAlert from '../../Modals/DeleteAlert/DeleteAlert'
import Views from '../../Modals/Views/Views'
import PEditor from '../../PEditor/PEditor'
import PHeader from '../../PHeader/PHeader'
import Reactions from '../../Reactions/Reactions'
import './Preview.css'

const Preview = ({ post }) => {
	const [isViews, setIsViews] = React.useState(false)
	const [deleteAlert, setDeleteAlert] = React.useState(false)
	const dispatch = useDispatch()
	const viewsButton = React.useRef()
	async function handleBtnDelete() {
		await dispatch(deletePost({ id: post?._id }))
		dispatch(deletePPost({ id: post?._id }))
	}
	React.useEffect(() => {
		if (isViews) {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: hidden; margin-right: 15px'
		} else {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: scroll; margin-right: 0px'
		}
	}, [isViews])

	React.useEffect(() => {
		if (deleteAlert) {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: hidden; margin-right: 15px'
		} else {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: scroll; margin-right: 0px'
		}
	}, [deleteAlert])

	return (
		<div className='Preview'>
			{deleteAlert && (
				<DeleteAlert
					handleBtnDelete={() => handleBtnDelete({ id: post?._id })}
					setDeleteAlert={event => setDeleteAlert(event)}
				/>
			)}
			{isViews && (
				<Views
					counter={post?.counter}
					reactions={post?.reactions?.counters}
					viewsButton={viewsButton}
					setIsViews={event => setIsViews(event)}
				/>
			)}
			<PHeader post={post} setDeleteAlert={event => setDeleteAlert(event)} />
			<NavLink to={`/post/${post?._id}`}>
				<PEditor title={post?.title} blocks={post?.blocks.slice(0, 2)} />
			</NavLink>
			<Reactions post={post} />
			<div className='Preview-footer'>
				<ul className='Preview-footer-params'>
					<li id='preview-params-li'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
						>
							<g clipPath='url(#clip0_429_11233)'>
								<path
									d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</g>
							<defs>
								<clipPath id='clip0_429_11233'>
									<rect width='24' height='24' fill='white' />
								</clipPath>
							</defs>
						</svg>
						<p>{post?.comments?.length}</p>
					</li>
					<li id='preview-params-li'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							id='preview-params-save'
							viewBox='0 0 32 32'
						>
							<g strokeWidth='1.5' id='Layer_1'>
								<g>
									<path d='m7.4282 30.2998c-.4097 0-.8203-.1064-1.1963-.3193-.7715-.4366-1.2319-1.2266-1.2319-2.1128v-23.8902c0-1.4272 1.1611-2.5884 2.5879-2.5884h16.8242c1.4268.0001 2.5879 1.1612 2.5879 2.5884v23.8901c0 .8862-.4604 1.6763-1.2319 2.1128-.7705.436-1.6851.4243-2.4448-.0313l-7.021-4.2124c-.1865-.1113-.418-.1113-.6045 0l-7.021 4.2124c-.3892.2335-.8184.3507-1.2486.3507zm8.5718-6.6475c.2304 0 .7683.0308 1.3315.3696l7.021 4.2124c.1318.0794.2967.0816.4307.0059.134-.0758.2171-.2185.2168-.3726v-23.8901c0-.3242-.2637-.5884-.5879-.5884h-16.8242c-.3242.0001-.5879.2642-.5879.5884v23.8901c-.0003.154.0828.2967.2168.3726.1339.0758.2988.0735.4307-.0059l7.021-4.2124c.1974-.1187.6743-.3696 1.3315-.3696z' />
								</g>
							</g>
						</svg>
						<p>{post?.savesCount}</p>
					</li>
				</ul>
				<div
					ref={viewsButton}
					onClick={() => setIsViews(true)}
					className='Preview-footer-eyes'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
					>
						<path
							d='M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					<p>{post?.counter?.feedViewsCount}</p>
				</div>
			</div>
		</div>
	)
}

export default Preview
