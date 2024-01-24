import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';

import InlineError from '../components/common/InlineError';
import useAuthorize from '../hooks/useAuthorize';
import { useFormik } from 'formik';
import { useState } from 'react';

const LoginForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const { authorize, isLoading } = useAuthorize();
	const { errors, touched, dirty, isValid, getFieldProps, handleSubmit } =
		useFormik({
			initialValues: {
				username: '',
				password: '',
			},
			validationSchema: yup.object({
				username: yup.string().required('Nazwa użytkownika jest wymagana'),
				password: yup.string().required('Hasło jest wymagane'),
			}),
			onSubmit: (values, { resetForm }) => {
				if (!isLoading) {
					authorize('login', values)
						.then(() => {
							resetForm();
							navigate('/');
						})
						.catch((err) => setError(err.message));
				}
			},
		});
	return (
		<div className='image-background w-full h-screen flex flex-col gap-6 items-center justify-center'>
			<div className=' bg-black-light text-white p-6 rounded-xl w-96 shadow-2xl'>
				<h2 className='mb-6'>Zaloguj się</h2>
				<form
					method='post'
					onSubmit={handleSubmit}
					className='flex flex-col gap-4'
				>
					<div className='form-field-wrapper'>
						<label htmlFor='username' className='text-sm'>
							Nazwa użytkownika
						</label>
						<input
							className='form-input'
							type='text'
							id='username'
							name='username'
							placeholder='Podaj nazwę użytkownika'
							{...getFieldProps('username')}
						/>
						{touched.username && errors.username && (
							<InlineError error={errors.username} />
						)}
					</div>
					<div className='form-field-wrapper'>
						<label htmlFor='password' className='text-sm'>
							Hasło
						</label>
						<input
							className='form-input'
							type='password'
							id='password'
							name='password'
							placeholder='Podaj hasło'
							{...getFieldProps('password')}
						/>
						{touched.password && errors.password && (
							<InlineError error={errors.password} />
						)}
					</div>
					<button
						type='submit'
						disabled={!(isValid && dirty)}
						className='default-button bg-red-dark border-red-dark text-white font-medium'
					>
						Zaloguj
					</button>
					{error && <InlineError error={error} />}
				</form>
				<div className='mt-6 text-center'>
					Nie masz konta?{' '}
					<Link to='/rejestracja' className='font-medium'>
						Zarejestruj się
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
