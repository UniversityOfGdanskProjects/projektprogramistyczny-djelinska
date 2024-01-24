import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';

import InlineError from '../components/common/InlineError';
import useAuthorize from '../hooks/useAuthorize';
import { useFormik } from 'formik';
import { useState } from 'react';

const SignupForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const { authorize, isLoading } = useAuthorize();
	const { errors, touched, dirty, isValid, getFieldProps, handleSubmit } =
		useFormik({
			initialValues: {
				username: '',
				email: '',
				password: '',
			},
			validationSchema: yup.object({
				username: yup
					.string()
					.min(2, 'Nazwa użytkownika jest za krótka')
					.max(20, 'Nazwa użtkownika jest za długa')
					.matches(
						/^[a-zA-Z0-9_]+$/,
						'Nazwa użytkownika może zawierać tylko litery, cyfry i znak podkreślenia'
					)
					.required('Nazwa użytkownika jest wymagana'),
				email: yup
					.string()
					.email('Nieprawidłowy adres e-mail')
					.required('Adres e-mail jest wymagany'),
				password: yup
					.string()
					.min(8, 'Hasło musi mieć minimum 8 znaków')
					.matches(/[A-Z]/, 'Hasło musi zawierać minimum jedną wielką literę')
					.matches(/\d/, 'Hasło musi zawierać minimum jedną cyfrę')
					.matches(
						/[!@#$%^&*(),.?":{}|<>]/,
						'Hasło musi zawierać minimum jeden znak specjalny'
					)
					.required('Hasło jest wymagane'),
			}),
			onSubmit: (values, { resetForm }) => {
				if (!isLoading) {
					authorize('register', values)
						.then(() => {
							resetForm();
							navigate('/');
						})
						.catch((err) => setError(err.message));
				}
			},
		});
	return (
		<div className='image-background p-navbar min-h-screen w-full flex flex-col gap-6 items-center justify-center'>
			<div className=' bg-black-light text-white p-6 rounded-xl w-96 shadow-2xl'>
				<h2 className='mb-6'>Zarejestruj się</h2>
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
						<label htmlFor='email' className='text-sm'>
							Adres e-mail
						</label>
						<input
							className='form-input'
							type='text'
							id='email'
							name='email'
							placeholder='Podaj adres e-mail'
							{...getFieldProps('email')}
						/>
						{touched.email && errors.email && (
							<InlineError error={errors.email} />
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
						Zarejestruj
					</button>
					{error && <InlineError error={error} />}
				</form>
				<div className='mt-6 text-center'>
					Masz już konto?{' '}
					<Link to='/login' className='font-medium'>
						Zaloguj się
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignupForm;
