import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoList from '../../Components/NoList/NoList'
import Preview from '../../Components/Posts/Preview/Preview'
import PreviewSkeleton from '../../Components/Skeleton/Posts/Preview/PreviewSkeleton'
import ScrollPost from '../../Components/Skeleton/ScrollPost/ScrollPost'
import { clearPData, fetchPosts } from '../../Redux/Slices/postsSlice'
import { TabTitleFunction } from '../../utils/TabTitle'
import './Feed.css'

const loadingPosts = [...new Array(10)]

function Feed() {
	TabTitleFunction('Лента — новости, медиа, фильмы, сериалы, игры')
	const dispatch = useDispatch()
	const [offset, setOffset] = React.useState(0)
	const posts = useSelector(state => state.posts.pData)
	const pStatus = useSelector(state => state.posts.firstFetchStatus)
	const hasMore = useSelector(state => state.posts.hasMore)
	React.useEffect(() => {
		dispatch(clearPData())
	}, [])
	React.useEffect(() => {
		dispatch(fetchPosts({ skip: offset, limit: 10 }))
	}, [offset])
	return (
		<div className='Feed'>
			<ul className='Feed-catalog'>
				{pStatus == 'loading' ? (
					loadingPosts.map((el, index) => (
						<li>
							<PreviewSkeleton key={index} />
						</li>
					))
				) : pStatus == 'loaded' && posts.length != 0 ? (
					posts.map((el, index) => (
						<li>
							<Preview key={index} post={el} />
						</li>
					))
				) : (
					<NoList />
				)}
			</ul>
			{pStatus == 'loaded' &&
				posts.length != 0 &&
				hasMore - posts.length != 0 && (
					<ScrollPost setOffset={event => setOffset(event)} />
				)}
		</div>
	)
}

export default Feed
