import React from 'react'
import './PreviewSkeleton.css'

function PreviewSkeleton() {
	return (
		<div className='PreviewSkeleton'>
			<div className='PreviewSkeleton-top'>
				<div className='PreviewSkeleton-top-author'>
					<div className='PreviewSkeleton-top-author-avatar'></div>
					<div className='PreviewSkeleton-top-author-about'>
						<p className='PreviewSkeleton-top-author-about-name'></p>
						<p className='PreviewSkeleton-top-author-about-createdAt'></p>
					</div>
				</div>
				<div className='PreviewSkeleton-top-buttons'>
					<div className='PreviewSkeleton-top-buttons-subscribe'></div>

					<div className='PreviewSkeleton-top-buttons-dots'></div>
				</div>
			</div>
			<div className='PreviewSkeleton-content'>
				<p className='PreviewSkeleton-content-title'></p>
				<p className='PreviewSkeleton-content-text-1'></p>
				<p className='PreviewSkeleton-content-text-2'></p>
				<p className='PreviewSkeleton-content-text-3'></p>
				<p className='PreviewSkeleton-content-text-4'></p>
				<p className='PreviewSkeleton-content-text-5'></p>
			</div>
			<div className='PreviewSkeleton-reactions'>
				<div className='PreviewSkeleton-reactions-reaction-1'></div>
				<div className='PreviewSkeleton-reactions-reaction-2'></div>
				<div className='PreviewSkeleton-reactions-reaction-3'></div>
			</div>
		</div>
	)
}

export default PreviewSkeleton
