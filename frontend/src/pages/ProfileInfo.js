import * as yup from 'yup';

import InlineError from '../components/common/InlineError';
import InlineMessage from '../components/common/InlineMessage';
import { useAuthContext } from '../contexts/AuthProvider';
import useDelete from '../hooks/useDelete';
import { useFormik } from 'formik';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useUpdate from '../hooks/useUpdate';

const ProfileInfo = () => {
	const navigate = useNavigate();
	const { deleteData, isLoading: deleteLoading } = useDelete();
	const {
		updateData,
		isLoading: updateLoading,
		message: updateMessage,
	} = useUpdate();
	const [error, setError] = useState({ update: '', delete: '' });
	const { user } = useAuthContext();
	const { logout } = useLogout();
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
				if (user) {
					if (!updateLoading) {
						updateData('users/account/update', values)
							.then(() => {
								resetForm();
								setError((prevError) => ({ ...prevError, update: '' }));
							})
							.catch((err) =>
								setError((prevError) => ({ ...prevError, update: err.message }))
							);
					}
				} else {
					navigate('/');
				}
			},
		});

	const handleDeleteAccount = () => {
		if (user) {
			if (!deleteLoading) {
				deleteData('users/account/delete')
					.then(() => {
						logout();
					})
					.catch((err) =>
						setError((prevError) => ({ ...prevError, delete: err.message }))
					);
			}
		} else {
			navigate('/');
		}
	};

	return (
		<div className='pt-navbar mt-6 w-full max-w-screen-lg'>
			<h3 className='text-xl font-semibold mb-6'>Konto</h3>
			<h4 className='text-lg font-medium mb-4 text-center'>Zmień hasło</h4>
			<form
				method='post'
				onSubmit={handleSubmit}
				className='flex flex-col gap-4'
			>
				<div className='form-field-wrapper'>
					<label htmlFor='currentPassword' className='text-sm'>
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
						<InlineError error={errors.currentPassword} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='newPassword' className='text-sm'>
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
						<InlineError error={errors.newPassword} />
					)}
				</div>
				<button
					type='submit'
					disabled={!(isValid && dirty)}
					className='default-button w-fit'
				>
					Zmień hasło
				</button>
				{error.update && <InlineError error={error.update} />}
				{updateMessage && <InlineMessage message={updateMessage} />}
			</form>
			<h4 className='text-lg font-medium mb-4 text-center'>Usuń konto</h4>
			<button
				onClick={handleDeleteAccount}
				disabled={deleteLoading}
				className='default-button mb-4'
			>
				Usuń konto
			</button>
			{error.delete && <InlineError error={error.delete} />}
		</div>
	);
};

export default ProfileInfo;
