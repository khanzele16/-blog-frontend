import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../../Redux/Slices/authSlice'
import { clearPData, fetchPosts } from '../../../Redux/Slices/postsSlice'
import './Auth.css'

function Auth({ setModalParams, authButton }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onSubmit = async data => {
		const user = await dispatch(loginUser(data))
		if (!user.payload) {
			console.log('Не удалось войти')
		} else {
			if (user.payload.token) {
				window.localStorage.setItem('token', user.payload.token)
				dispatch(clearPData())
				dispatch(fetchPosts({ skip: 0, limit: 10 }))
				setModalParams({})
				navigate('/feed')
			} else {
				console.log('Не удалось войти')
			}
		}
	}
	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const authModal = React.useRef()
	React.useEffect(() => {
		const handleClickListener = event => {
			if (
				!event.composedPath().includes(authModal.current) &&
				!event.composedPath().includes(authButton.current)
			) {
				setModalParams({})
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<div className='Auth'>
			<div ref={authModal} className='Auth-modal'>
				<div className='Auth-modal-header'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						onClick={() => setModalParams({})}
					>
						<path
							d='M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z'
							fill='#969c9d'
						/>
					</svg>
				</div>
				<div className='Auth-modal-content'>
					<div className='Auth-modal-content-logo'>
						<div className='Auth-modal-content-logo-avatar'>
							<p>.blog</p>
						</div>
						<p>Вход в аккаунт</p>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='Auth-modal-content-form'
					>
						<div id='auth-modal-form-email'>
							<input
								{...register('email', {
									required: 'Введите почту',
								})}
								type='text'
								placeholder='Почта'
							/>
						</div>
						<div id='auth-modal-form-password'>
							<input
								{...register('password', {
									required: 'Введите пароль',
								})}
								type='password'
								placeholder='Пароль'
							/>
						</div>
						<button id='auth-modal-form-button'>Войти</button>
						<p id='auth-modal-form-forgot-password'>Забыли пароль?</p>
					</form>
					<div className='Auth-modal-footer'>
						<p>
							Нет аккаунта? <span>Зарегистрироваться</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth
