export const dotsCatalog = (post) => {
	return [
		{
			icon: (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
					<path
						d='M11.9999 17V21M6.9999 12.6667V6C6.9999 4.89543 7.89533 4 8.9999 4H14.9999C16.1045 4 16.9999 4.89543 16.9999 6V12.6667L18.9135 15.4308C19.3727 16.094 18.898 17 18.0913 17H5.90847C5.1018 17 4.62711 16.094 5.08627 15.4308L6.9999 12.6667Z'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			),
			name: 'Закрепить',
			isExist: post?.dots?.canPin,
		},
		{
			icon: (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
					<path
						d='M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
			name: 'Редактировать',
			isExist: post?.dots?.canEdit,
		},
		{
			action: 'delete',
			icon: (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
					<path
						d='M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
			name: 'Удалить',
			isExist: post?.dots?.canDelete,
		},
		{
			icon: (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
					<path
						d='M5 21V3.90002C5 3.90002 5.875 3 8.5 3C11.125 3 12.875 4.8 15.5 4.8C18.125 4.8 19 3.9 19 3.9V14.7C19 14.7 18.125 15.6 15.5 15.6C12.875 15.6 11.125 13.8 8.5 13.8C5.875 13.8 5 14.7 5 14.7'
						stroke='#969c9d'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
			name: 'Пожаловаться',
			isExist: post?.dots?.canReport,
		},
		{
			icon: (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
					<path
						d='M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5'
						stroke='#969c9d'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
			name: 'Скрыть',
			isExist: post?.dots?.canHide,
		},
	]
}