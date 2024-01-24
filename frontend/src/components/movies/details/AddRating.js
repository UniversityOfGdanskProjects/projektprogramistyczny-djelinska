import InlineError from '../../common/InlineError';
import InlineMessage from '../../common/InlineMessage';
import Star from './Star';
import { useAuthContext } from '../../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import usePost from '../../../hooks/usePost';
import { useState } from 'react';

const AddRating = ({ movieId, handleChange }) => {
	const [stars, setStars] = useState(0);
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const { postData, isLoading, message } = usePost();
	const [error, setError] = useState('');

	const handleAddRating = () => {
		setError('');

		if (user) {
			if (!isLoading) {
				postData('movies/rate/add', { movie_id: movieId, rate: stars })
					.then(() => handleChange())
					.catch((err) => setError(err.message));
			}
		} else {
			navigate('/login');
		}
	};

	return (
		<div className='flex flex-wrap'>
			<h3 className='w-full mb-4'>Dodaj ocenę filmu</h3>
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
				disabled={isLoading || stars < 1}
			>
				Dodaj ocenę
			</button>
			<div className='w-full mt-4'>
				{error && <InlineError error={error} />}
				{message && <InlineMessage message={message} />}
			</div>
		</div>
	);
};

export default AddRating;
