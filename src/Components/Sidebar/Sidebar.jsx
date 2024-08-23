import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
	clearCommunities,
	fetchCommunities,
} from '../../Redux/Slices/communitySlice'
import CommunitySkeleton from './../Skeleton/Community/CommunitySkeleton'
import './Sidebar.css'

const sidebarParams = [
	{
		name: 'Лента',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				id='icon-popular'
				viewBox='0 0 24 24'
			>
				<path d='M12 21C16.4183 21 20 17.6439 20 13.504C20 9.76257 17.9654 6.83811 16.562 5.44436C16.3017 5.18584 15.8683 5.30006 15.7212 5.63288C14.9742 7.3229 13.4178 9.75607 11.4286 9.75607C10.1975 9.92086 8.31688 8.86844 9.83483 3.64868C9.97151 3.17868 9.46972 2.80113 9.08645 3.11539C6.9046 4.90436 4 8.51143 4 13.504C4 17.6439 7.58172 21 12 21Z' />
			</svg>
		),
		to: 'feed',
	},
	{
		name: 'Подписки',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' id='icon-my' viewBox='0 0 24 24'>
				<path d='M22 19H13C9.22876 19 7.34315 19 6.17157 17.8284C5 16.6569 5 14.7712 5 11V2' />
				<path d='M8 5H11C14.7712 5 16.6569 5 17.8284 6.17157C19 7.34315 19 9.22876 19 13V16M2 5H5M19 19V22' />
			</svg>
		),
		to: 'subscriptions',
	},
	{
		name: 'Обзор',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				id='icon-discovery'
				viewBox='0 0 24 24'
			>
				<path d='M13.024 14.5601C10.7142 15.484 9.5593 15.946 8.89964 15.4977C8.74324 15.3914 8.60834 15.2565 8.50206 15.1001C8.0538 14.4405 8.51575 13.2856 9.43967 10.9758C9.63673 10.4831 9.73527 10.2368 9.90474 10.0435C9.94792 9.99429 9.99429 9.94792 10.0435 9.90474C10.2368 9.73527 10.4831 9.63673 10.9758 9.43966C13.2856 8.51575 14.4405 8.0538 15.1001 8.50206C15.2565 8.60834 15.3914 8.74324 15.4977 8.89964C15.946 9.5593 15.484 10.7142 14.5601 13.024C14.363 13.5166 14.2645 13.763 14.095 13.9562C14.0518 14.0055 14.0055 14.0518 13.9562 14.095C13.763 14.2645 13.5166 14.363 13.024 14.5601Z' />
				<path d='M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7' />
			</svg>
		),
		to: 'discovery',
	},
]
const sidebarCommunities = [
	{
		name: 'Вопросы',
		href: 'questions',
		profileUrl:
			'https://leonardo.osnova.io/b5463920-7d83-df60-e73e-52d547bf5ae0/-/scale_crop/72x72/',
	},
	{
		name: 'Игры',
		href: 'games',
		profileUrl:
			'https://leonardo.osnova.io/e5348320-b11a-9419-fb85-f7b63e2de194/-/scale_crop/72x72/',
	},
	{
		name: 'Музыка',
		href: 'music',
		profileUrl:
			'https://leonardo.osnova.io/1c00b5aa-00e4-5c78-a8ee-107725c1dcaf/-/scale_crop/72x72/',
	},
	{
		name: 'Творчество',
		href: 'creativity',
		profileUrl:
			'https://leonardo.osnova.io/34be5067-2cdf-2eb3-d9af-415abb861967/-/scale_crop/72x72/',
	},
	{
		name: 'Кино и сериалы',
		href: 'cinema',
		profileUrl:
			'https://leonardo.osnova.io/5d198df0-3ba4-6837-b9c3-ac8c04fb9181/-/scale_crop/72x72/',
	},
	{
		name: 'Видео',
		href: 'video',
		profileUrl:
			'https://leonardo.osnova.io/fac10315-1c6f-4dd0-1f7c-8fdd394acdad/-/scale_crop/72x72/',
	},
	{
		name: 'Жизнь',
		href: 'life',
		profileUrl:
			'https://leonardo.osnova.io/968a91e7-3a3c-5c79-a0cb-2b3df974a697/-/scale_crop/72x72/',
	},
	{
		name: 'Фото',
		href: 'photo',
		profileUrl:
			'https://leonardo.osnova.io/dff74577-5090-125c-b8d6-95e958ada5c0/-/scale_crop/72x72/" srcset="https://leonardo.osnova.io/dff74577-5090-125c-b8d6-95e958ada5c0/-/scale_crop/72x72/',
	},
	{
		name: 'Милые животные',
		href: 'pets',
		profileUrl:
			'https://leonardo.osnova.io/d043463b-7273-56ec-9f42-a896fc32cd77/-/scale_crop/72x72/',
	},
	{
		name: 'Скидки',
		href: 'sale',
		profileUrl:
			'https://leonardo.osnova.io/4b976a9b-6d27-1411-0d14-04725f32ebfa/-/scale_crop/72x72/',
	},
]
const sidebarAbout = [
	{
		name: 'О проекте',
		href: 'about',
	},
	{
		name: 'Правила',
		href: 'rules',
	},
	{
		name: 'Реклама',
		href: 'ads',
	},
	{
		name: 'Приложения',
		href: 'about',
	},
]

const onClickTop = () => {
	window.scrollTo(0, 250)
}
const loadingCommunies = [...new Array(8)]

function Sidebar() {
	const dispatch = useDispatch()
	const [offset, setOffset] = React.useState(0)
	const cData = useSelector(state => state.community.cData)
	const firstStatus = useSelector(state => state.community.firstFetchStatus)
	const hasMore = useSelector(state => state.community.hasMore)
	React.useEffect(() => {
		dispatch(clearCommunities())
	}, [])
	React.useEffect(() => {
		dispatch(fetchCommunities({ skip: offset }))
	}, [offset])
	return (
		<div className='Sidebar-content'>
			<ul className='Sidebar-content-sort'>
				{sidebarParams.map((el, index) => (
					<NavLink
						onClick={onClickTop}
						key={index}
						className={({ isActive }) =>
							isActive ? 'sidebar-section-li-active' : ''
						}
						to={`/${el.to}`}
					>
						<li id='sidebar-section-li'>
							{el.icon}
							<p>{el.name}</p>
						</li>
					</NavLink>
				))}
			</ul>
			<ul className='Sidebar-content-community'>
				<p id='sidebar-community-title'>Сообщества</p>
				<ul className='Sidebar-content-community-catalog'>
					{firstStatus == 'loading' &&
						loadingCommunies.map((el, index) => (
							<CommunitySkeleton key={index} />
						))}
					{firstStatus == 'loaded' &&
						cData?.map((el, index) => (
							<NavLink
								onClick={onClickTop}
								key={index}
								to={`/c/${el?.nickname}/posts`}
								className={({ isActive }) =>
									isActive ? 'sidebar-section-li-active' : ''
								}
							>
								<li id='sidebar-section-li'>
									<img src={el?.avatarUrl} alt='' />
									<p>
										{el?.name?.length >= 14
											? `${el?.name?.substring(0, 12)}...`
											: el?.name}
									</p>
								</li>
							</NavLink>
						))}
					{firstStatus == 'error' && (
						<div className='Sidebar-content-community-catalog-none'>
							<p>Сообществ нет либо вышла какая-то ошибка</p>
						</div>
					)}
					{hasMore - cData?.length != 0 && firstStatus != 'error' ? (
						<div
							onClick={() => setOffset(prev => prev + 8)}
							id='sidebar-section-li'
							className='Sidebar-content-community-next'
						>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
								<path d='M6.46967 13.9697C6.17678 14.2626 6.17678 14.7374 6.46967 15.0303L11.4697 20.0303C11.7626 20.3232 12.2374 20.3232 12.5303 20.0303L17.5303 15.0303C17.8232 14.7374 17.8232 14.2626 17.5303 13.9697C17.2374 13.6768 16.7626 13.6768 16.4697 13.9697L12.75 17.6893L12.75 9.5C12.75 8.78668 12.9702 7.70001 13.6087 6.81323C14.2196 5.96468 15.2444 5.25 17 5.25C17.4142 5.25 17.75 4.91421 17.75 4.5C17.75 4.08579 17.4142 3.75 17 3.75C14.7556 3.75 13.2804 4.70198 12.3913 5.93677C11.5298 7.13332 11.25 8.54665 11.25 9.5L11.25 17.6893L7.53033 13.9697C7.23744 13.6768 6.76256 13.6768 6.46967 13.9697Z' />
							</svg>
							<p>Показать ещё</p>
						</div>
					) : (
						''
					)}
				</ul>
			</ul>
			<ul className='Sidebar-content-about'>
				<p id='sidebar-about-title'>.blog</p>
				<ul className='Sidebar-content-about-catalog'>
					{sidebarAbout.map((el, index) => (
						<NavLink
							onClick={onClickTop}
							key={index}
							to={`/${el.href}`}
							className={({ isActive }) =>
								isActive ? 'sidebar-section-li-active' : ''
							}
						>
							<li id='sidebar-section-li'>
								{el.icon}
								<p>{el.name}</p>
							</li>
						</NavLink>
					))}
				</ul>
			</ul>
		</div>
	)
}

export default Sidebar
