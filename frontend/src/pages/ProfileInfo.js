import * as yup from 'yup';

import { useAuthContext } from '../contexts/AuthProvider';
import useDelete from '../hooks/useDelete';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useUpdate from '../hooks/useUpdate';

const ProfileInfo = () => {
	const { deleteData, isLoading: deleteLoading } = useDelete();
	const {
		updateData,
		isLoading: updateLoading,
		message: updateMessage,
	} = useUpdate();
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { user, logoutUser } = useAuthContext();
	const { errors, touched, dirty, isValid, getFieldProps, handleSubmit } =
		useFormik({
			initialValues: {
				currentPassword: '',
				newPassword: '',
			},
			validationSchema: yup.object({
				currentPassword: yup.string().required('Obecne hasło jest wymagane'),
				newPassword: yup
					.string()
					.min(8, 'Hasło musi mieć minimum 8 znaków')
					.matches(/[A-Z]/, 'Hasło musi zawierać minimum jedną wielką literę')
					.matches(/\d/, 'Hasło musi zawierać minimum jedną cyfrę')
					.matches(
						/[!@#$%^&*(),.?":{}|<>]/,
						'Hasło musi zawierać minimum jeden znak specjalny'
					)
					.required('Nowe hasło jest wymagane'),
			}),
			onSubmit: async (values, { resetForm }) => {
				if (!updateLoading) {
					try {
						await updateData('users/account/update', values);
						resetForm();
					} catch (err) {
						setError(err.message);
					}
				}
			},
		});

	const handleDeleteAccount = async () => {
		if (user) {
			if (!deleteLoading) {
				try {
					await deleteData('users/account/delete');
					logoutUser();
					navigate('/');
				} catch (err) {
					setError(err.message);
				}
			}
		} else {
			navigate('/');
		}
	};

	return (
		<div className='pt-navbar mt-6 w-full max-w-screen-lg'>
			<h3 className='text-xl font-semibold mb-6'>Konto</h3>
			{error && <div className='text-sm mb-4'>{error} </div>}
			<h4 className='text-lg font-medium mb-4 text-center'>Zmień hasło</h4>
			<form
				method='post'
				onSubmit={handleSubmit}
				className='flex flex-col gap-4'
			>
				<div>
					<label htmlFor='currentPassword' className='mr-6'>
						Obecne hasło
					</label>
					<input
						type='password'
						id='currentPassword'
						name='currentPassword'
						placeholder='Podaj obecne hasło'
						{...getFieldProps('currentPassword')}
						className='form-input'
					/>
					{touched.currentPassword && errors.currentPassword && (
						<div className='text-sm mt-4'>{errors.currentPassword}</div>
					)}
				</div>
				<div>
					<label htmlFor='newPassword' className='mr-6'>
						Nowe hasło
					</label>
					<input
						type='password'
						id='newPassword'
						name='newPassword'
						placeholder='Podaj nowe hasło'
						{...getFieldProps('newPassword')}
						className='form-input'
					/>
					{touched.newPassword && errors.newPassword && (
						<div className='text-sm mt-4'>{errors.newPassword}</div>
					)}
				</div>
				<button
					type='submit'
					disabled={!(isValid && dirty)}
					className='default-button w-fit'
				>
					Zmień hasło
				</button>
			</form>
			{updateMessage && <div className='mt-4'>{updateMessage}</div>}
			<h4 className='text-lg font-medium mb-4 text-center'>Usuń konto</h4>
			<button
				onClick={handleDeleteAccount}
				disabled={deleteLoading}
				className='default-button'
			>
				Usuń konto
			</button>
		</div>
	);
};

export default ProfileInfo;
