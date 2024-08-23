import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { logoutUData } from '../../Redux/Slices/authSlice'
import { clearPData, fetchPosts } from '../../Redux/Slices/postsSlice'
import './Profile.css'

const profileBar = [
	{
		icon: (
			<svg
				id='profile-list-draft'
				xmlns='http://www.w3.org/2000/svg'
				fill='#c9cccf'
				viewBox='0 0 24 24'
			>
				<path d='M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z' />
			</svg>
		),
		name: 'Черновики',
		href: 'drafts',
	},
	{
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				id='profile-list-save'
				viewBox='0 0 32 32'
				fill='#c9cccf'
			>
				<g stroke='#c9cccf' strokeWidth='1.5' id='Layer_1'>
					<g>
						<path d='m7.4282 30.2998c-.4097 0-.8203-.1064-1.1963-.3193-.7715-.4366-1.2319-1.2266-1.2319-2.1128v-23.8902c0-1.4272 1.1611-2.5884 2.5879-2.5884h16.8242c1.4268.0001 2.5879 1.1612 2.5879 2.5884v23.8901c0 .8862-.4604 1.6763-1.2319 2.1128-.7705.436-1.6851.4243-2.4448-.0313l-7.021-4.2124c-.1865-.1113-.418-.1113-.6045 0l-7.021 4.2124c-.3892.2335-.8184.3507-1.2486.3507zm8.5718-6.6475c.2304 0 .7683.0308 1.3315.3696l7.021 4.2124c.1318.0794.2967.0816.4307.0059.134-.0758.2171-.2185.2168-.3726v-23.8901c0-.3242-.2637-.5884-.5879-.5884h-16.8242c-.3242.0001-.5879.2642-.5879.5884v23.8901c-.0003.154.0828.2967.2168.3726.1339.0758.2988.0735.4307-.0059l7.021-4.2124c.1974-.1187.6743-.3696 1.3315-.3696z' />
					</g>
				</g>
			</svg>
		),
		name: 'Закладки',
		href: 'saves',
	},
	{
		icon: (
			<svg
				id='profile-list-settings'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
			>
				<circle stroke='#c9cccf' cx='12' cy='12' r='3' strokeWidth='2' />
				<path
					stroke='#c9cccf'
					d='M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z'
					strokeWidth='2'
				/>
			</svg>
		),
		name: 'Настройки',
		href: 'settings',
	},
]

function Profile({ uData }) {
	const profileBody = React.useRef()
	const profileButton = React.useRef()
	const [isProfile, setIsProfile] = React.useState(false)
	const [modalParams, setModalParams] = useSearchParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	React.useEffect(() => {
		const handleClickListener = event => {
			if (
				!event.composedPath().includes(profileBody.current) &&
				!event.composedPath().includes(profileButton.current)
			) {
				setIsProfile(false)
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<>
			<div id='header-profile-control'>
				<div
					onClick={() => {
						setIsProfile(!isProfile)
					}}
					ref={profileButton}
					id='header-profile-control-preview'
				>
					<img src={uData.avatarUrl} alt='' />
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
					>
						<path
							d='M4 8L12 16L20 8'
							stroke='#c9cccf'
							strokeWidth='3'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
				{isProfile ? (
					<div ref={profileBody} id='header-profile-control-bar'>
						<div id='header-profile-control-bar-top'>
							<p id='header-profile-control-bar-top-title'>Мой профиль</p>
							<p id='header-profile-control-bar-top-username'>
								@{uData.username}
							</p>
						</div>
						<ul id='header-profile-control-bar-list'>
							<li
								onClick={() => {
									navigate(`/u/${uData.username}/posts`)
									setIsProfile(false)
								}}
								id='profile-list-item-profile'
							>
								<img src={uData.avatarUrl} alt='' />
								<div id='profile-list-item-profile-info'>
									<p id='profile-list-item-profile-info-name'>{uData.name}</p>
									<p id='profile-list-item-profile-info-about'>
										{uData?.about
											? uData.about.length > 28
												? uData.about.substring(0, 27) + '...'
												: uData.about
											: 'Личный блог'}
									</p>
								</div>
							</li>
							{profileBar.map((el, index) => (
								<NavLink
									onClick={() => setIsProfile(false)}
									to={el.href}
									key={index}
								>
									<li id='profile-list-item-map'>
										{el.icon}
										<p>{el.name}</p>
									</li>
								</NavLink>
							))}
							<li
								onClick={() => {
									setIsProfile(false)
									setModalParams({
										modal: 'plus',
									})
								}}
								id='profile-list-item-plus'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
								>
									<path
										d='M4.8057 5.70615C5.39093 4.87011 5.68354 4.45209 6.11769 4.22604C6.55184 4 7.0621 4 8.08262 4H12H15.9174C16.9379 4 17.4482 4 17.8823 4.22604C18.3165 4.45209 18.6091 4.87011 19.1943 5.70615L19.7915 6.55926C20.6144 7.73493 21.0259 8.32277 21.0064 8.98546C20.9869 9.64815 20.5415 10.2107 19.6507 11.3359L14.375 18V18C13.6417 18.9263 13.275 19.3895 12.8472 19.5895C12.3103 19.8406 11.6897 19.8406 11.1528 19.5895C10.725 19.3895 10.3583 18.9263 9.625 18V18L4.34927 11.3359C3.4585 10.2107 3.01312 9.64815 2.99359 8.98546C2.97407 8.32277 3.38555 7.73493 4.20852 6.55926L4.8057 5.70615Z'
										stroke='#c9cccf'
										strokeWidth='2'
										strokeLinejoin='round'
									/>
									<path
										d='M9 7.5L8.5 8.25V8.25C8.20344 8.69484 8.23479 9.28176 8.57706 9.69247L10.5 12'
										stroke='#c9cccf'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<p>Подписка Plus</p>
							</li>
							<li
								onClick={() => {
									setIsProfile(false)
									window.localStorage.removeItem('token')
									dispatch(logoutUData())
									dispatch(clearPData())
									dispatch(
										fetchPosts({ skip: 0, limit: 10 })
									)
									navigate('/feed')
								}}
								id='profile-list-item-logout'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='800px'
									height='800px'
									viewBox='0 0 24 24'
									fill='none'
								>
									<path
										d='M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M3 12L15 12M3 12L7 8M3 12L7 16'
										stroke='#ff2a2a'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>

								<p>Выйти</p>
							</li>
						</ul>
					</div>
				) : (
					''
				)}
			</div>
		</>
	)
}

export default Profile
