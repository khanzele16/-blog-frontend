import React from 'react'
import './PEditor.css'

function PEditor({ title, blocks }) {
	return (
		<div className='PEditor'>
			{title && <h1 id='post-content-title'>{title}</h1>}
			{blocks.map((el, index) => (
				<>
					{el.type == 'media' && (
						<div id='post-content-media'>
							{el.data.map((dataEl, index) => (
								<>
									{(dataEl.type == 'image' || dataEl.type == 'gif') &&
										dataEl.items.map((obj, index) => (
											<img
												key={index}
												id='post-content-media-image'
												src={obj}
												alt=''
											/>
										))}
								</>
							))}
						</div>
					)}
					{el.type == 'text' && (
						<div
							dangerouslySetInnerHTML={{ __html: el.data.text }}
							id='post-content-text'
						></div>
					)}
					{el.type == 'list' && (
						<ul id='post-content-list'>
							{el.data.items.map((obj, index) => (
								<li
									key={index}
									dangerouslySetInnerHTML={{ __html: obj }}
									id='post-content-list-li'
								></li>
							))}
						</ul>
					)}
					{el.type == 'delimiter' && <div id='post-content-delimiter'></div>}
				</>
			))}
		</div>
	)
}

export default PEditor
