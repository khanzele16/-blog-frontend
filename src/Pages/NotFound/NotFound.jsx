import React from 'react'
import Banner from '../../Components/Banner/Banner'
import { TabTitleFunction } from '../../utils/TabTitle'
import './NotFound.css'

function NotFound() {
	TabTitleFunction('Страница не найдена')
	return (
		<div className='NotFound'>
			<div className='NotFound-content'>
				<p>Страница не найдена</p>
			</div>
			<Banner />
			<div className='NotFound-recommendations'>
				<div className='NotFound-recommendations-title'>
					<h3>Рекомендации</h3>
				</div>
				<ul className='NotFound-recommendations-list'></ul>
			</div>
		</div>
	)
}

export default NotFound
