import React from 'react'
import './ScrollPost.css'
import { useIntersectionObserver } from '@siberiacancode/reactuse'

function ScrollPost({ setOffset }) {
	const { ref } = useIntersectionObserver({
		threshold: 1,
		onChange: entry => {
			if (entry.isIntersecting) setOffset(prev => prev + 10)
		},
	})
	return (
		<div ref={ref} className='ScrollPost'>
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
				<circle
					fill='#c9cccf'
					stroke='#c9cccf'
					strokeWidth='15'
					r='15'
					cx='30'
					cy='100'
				>
					<animate
						attributeName='opacity'
						calcMode='spline'
						dur='2'
						values='0.3;0;0.3;'
						keySplines='.5 0 .5 1;.5 0 .5 1'
						repeatCount='indefinite'
						begin='-.4'
					></animate>
				</circle>
				<circle
					fill='#c9cccf'
					stroke='#c9cccf'
					strokeWidth='15'
					r='15'
					cx='100'
					cy='100'
				>
					<animate
						attributeName='opacity'
						calcMode='spline'
						dur='2'
						values='0.3;0;0.3;'
						keySplines='.5 0 .5 1;.5 0 .5 1'
						repeatCount='indefinite'
						begin='-.2'
					></animate>
				</circle>
				<circle
					fill='#c9cccf'
					stroke='#c9cccf'
					strokeWidth='15'
					r='15'
					cx='170'
					cy='100'
				>
					<animate
						attributeName='opacity'
						calcMode='spline'
						dur='2'
						values='0.3;0;0.3;'
						keySplines='.5 0 .5 1;.5 0 .5 1'
						repeatCount='indefinite'
						begin='0'
					></animate>
				</circle>
			</svg>
		</div>
	)
}

export default ScrollPost
