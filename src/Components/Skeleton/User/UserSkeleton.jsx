import React from 'react'
import './UserSkeleton.css'

function UserSkeleton() {
	return (
		<div className='UserSkeleton'>
			<div className='UserSkeleton-top'></div>
			<div className='UserSkeleton-avatar'></div>
			<div className='UserSkeleton-bottom'>
				<p className='UserSkeleton-bottom-button'></p>
				<div className='UserSkeleton-bottom-names'>
					<p className='UserSkeleton-bottom-names-name'></p>
					<p className='UserSkeleton-bottom-names-username'></p>
				</div>
				<p className='UserSkeleton-bottom-createdAt'></p>
				<p className='UserSkeleton-bottom-about'></p>
				<div className='UserSkeleton-bottom-statistic'>
					<p className='UserSkeleton-bottom-statistic-subscribers'></p>
					<p className='UserSkeleton-bottom-statistic-subscriptions'></p>
					<p className='UserSkeleton-bottom-statistic-likes'></p>
				</div>
			</div>
		</div>
	)
}

export default UserSkeleton
