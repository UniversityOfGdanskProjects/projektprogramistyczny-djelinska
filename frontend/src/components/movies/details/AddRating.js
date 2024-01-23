import { useEffect, useState } from 'react';

import Star from './Star';
import { useAuthContext } from '../../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import usePost from '../../../hooks/usePost';

const AddRating = ({ movieId, handleChange }) => {
	const [stars, setStars] = useState(0);
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const { postData, isLoading, message } = usePost();
	const [error, setError] = useState('');

	const handleAddRating = async () => {
		setError('');

		if (user) {
			if (!isLoading) {
				try {
					await postData('movies/rate/add', { movie_id: movieId, rate: stars });
					handleChange();
				} catch (err) {
					setError(err.message);
				}
			}
		} else {
			navigate('/login');
		}
	};

	return (
		<div className='flex flex-wrap'>
			<h3 className='w-full text-xl font-semibold mb-4'>Dodaj ocenę filmu</h3>
			<div className='flex items-center gap-4 w-1/2'>
				{Array.from({ length: 5 }, (_, index) => (
					<Star
						key={index}
						selected={index < stars}
						handleRate={() => setStars(index + 1)}
					/>
				))}
			</div>
			<button
				onClick={handleAddRating}
				className='default-button'
				disabled={isLoading}
			>
				Dodaj ocenę
			</button>
			{error && <div className='w-full text-sm mt-4'>{error}</div>}
			{message && <div className='w-full text-sm'>{message}</div>}
		</div>
	);
};

export default AddRating;
