import * as yup from 'yup';

import InlineError from '../common/InlineError';
import InlineMessage from '../common/InlineMessage';
import { useFormik } from 'formik';
import usePost from '../../hooks/usePost';
import { useState } from 'react';

const AddMovieForm = () => {
	const { postData, isLoading, message } = usePost();
	const [error, setError] = useState('');
	const { errors, touched, dirty, isValid, getFieldProps, handleSubmit } =
		useFormik({
			initialValues: {
				title: '',
				description: '',
				genre: '',
				release_year: '',
				duration_time: '',
				director: '',
				poster_image: '',
				video_url: '',
			},
			validationSchema: yup.object({
				title: yup.string().required('Tytuł filmu jest wymagany'),
				description: yup
					.string()
					.max(500, 'Opis filmu jest za długi')
					.required('Opis filmu jest wymagany'),
				genre: yup.string().required('Gatunek filmu jest wymagany'),
				release_year: yup
					.number()
					.typeError('Rok produkcji musi być liczbą')
					.integer('Rok produkcji musi być liczbą całkowitą')
					.min(1800, 'Rok produkcji musi być równy lub większy niż 1800')
					.max(
						new Date().getFullYear(),
						'Rok produkcji nie może być większy niż bieżący rok'
					)
					.required('Rok produkcji filmu jest wymagany'),
				duration_time: yup
					.number()
					.typeError('Czas trwania musi być liczbą')
					.min(0, 'Czas trwania filmu jest za krótki')
					.required('Czas trwania filmu jest wymagany'),
				director: yup.string().required('Reżyser filmu jest wymagany'),
				poster_image: yup
					.string()
					.url('Nieprawidłowy adres url')
					.required('Adres url zdjęcia jest wymagany'),
				video_url: yup.string().url('Nieprawidłowy adres url'),
			}),
			onSubmit: (values, { resetForm }) => {
				if (!isLoading) {
					postData('admin/movies', values)
						.then(() => {
							resetForm();
						})
						.catch((err) => setError(err.message));
				}
			},
		});
	return (
		<div>
			<h3 className='font-semibold mt-6 mb-4'>Dodaj film</h3>
			<form
				method='post'
				onSubmit={handleSubmit}
				className='flex flex-col gap-4'
			>
				<div className='form-field-wrapper'>
					<label htmlFor='title' className='text-sm'>
						Tytuł
					</label>
					<input
						className='form-input'
						type='text'
						id='title'
						name='title'
						placeholder='Podaj tytuł filmu'
						{...getFieldProps('title')}
					/>
					{touched.title && errors.title && (
						<InlineError error={errors.title} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='description' className='text-sm'>
						Opis
					</label>
					<textarea
						className='form-input resize-none'
						id='description'
						name='description'
						placeholder='Podaj opis filmu'
						{...getFieldProps('description')}
					></textarea>
					{touched.description && errors.description && (
						<InlineError error={errors.description} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='genre' className='text-sm'>
						Gatunek
					</label>
					<input
						className='form-input'
						type='text'
						id='genre'
						name='genre'
						placeholder='Podaj gatunek filmu'
						{...getFieldProps('genre')}
					/>
					{touched.genre && errors.genre && (
						<InlineError error={errors.genre} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='release_year' className='text-sm'>
						Rok produkcji
					</label>
					<input
						className='form-input'
						type='text'
						id='release_year'
						name='release_year'
						placeholder='Podaj rok produkcji filmu'
						{...getFieldProps('release_year')}
					/>
					{touched.release_year && errors.release_year && (
						<InlineError error={errors.release_year} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='duration_time' className='text-sm'>
						Czas trwania w godzinach
					</label>
					<input
						className='form-input'
						type='text'
						id='duration_time'
						name='duration_time'
						placeholder='Podaj czas trwania filmu'
						{...getFieldProps('duration_time')}
					/>
					{touched.duration_time && errors.duration_time && (
						<InlineError error={errors.duration_time} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='director' className='text-sm'>
						Reżyser
					</label>
					<input
						className='form-input'
						type='text'
						id='director'
						name='director'
						placeholder='Podaj reżysera filmu'
						{...getFieldProps('director')}
					/>
					{touched.director && errors.director && (
						<InlineError error={errors.director} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='poster_image' className='text-sm'>
						Adres url zdjęcia
					</label>
					<input
						className='form-input'
						type='text'
						id='poster_image'
						name='poster_image'
						placeholder='Podaj adres url zdjęcia filmu'
						{...getFieldProps('poster_image')}
					/>
					{touched.poster_image && errors.poster_image && (
						<InlineError error={errors.poster_image} />
					)}
				</div>
				<div className='form-field-wrapper'>
					<label htmlFor='video_url' className='text-sm'>
						Adres url zwiastuna
					</label>
					<input
						className='form-input'
						type='text'
						id='video_url'
						name='video_url'
						placeholder='Podaj adres url zwiastuna filmu'
						{...getFieldProps('video_url')}
					/>
					{touched.video_url && errors.video_url && (
						<InlineError error={errors.video_url} />
					)}
				</div>
				<button
					type='submit'
					disabled={!(isValid && dirty)}
					className='default-button w-fit'
				>
					Dodaj film
				</button>
				{error && <InlineError error={error} />}
				{message && <InlineMessage message={message} />}
			</form>
		</div>
	);
};

export default AddMovieForm;
