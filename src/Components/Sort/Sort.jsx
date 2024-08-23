import React from 'react'

const sortCatalog = [
	{
		name: 'Новое'
	}
]

function Sort() {
	return (
		<div className='Sort'>
			<div className='Sort-panel'>
				<div className='Sort-panel-name'>
					<p>Новое</p>
				</div>
				<ul className='Sort-panel-catalog'></ul>
			</div>
		</div>
	)
}

export default Sort
