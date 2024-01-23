import { PiBookmarkSimpleBold, PiHeartBold, PiMinusBold } from 'react-icons/pi';

import { useAuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useUpdate from '../../hooks/useUpdate';

const MovieOptions = ({ movieId, type, handleChange }) => {
	const [error, setError] = useState('');
	const { updateData, isLoading, message } = useUpdate();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const handleAddTo = async (listType) => {
		setError('');

		if (user) {
			if (!isLoading) {
				try {
					await updateData(`users/${listType}/add`, { movie_id: movieId });
				} catch (err) {
					setError(err.message);
				}
			}
		} else {
			navigate('/login');
		}
	};

	const handleDeleteFrom = async (listType) => {
		setError('');

		if (user) {
			if (!isLoading) {
				try {
					await updateData(`users/${listType}/delete`, { movie_id: movieId });
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
		<div>
			<div className='flex items-center gap-4 mt-6'>
				{type === 'list' && (
					<>
						<button
							onClick={() => handleAddTo('favorites')}
							className='icon-button border-gray-light'
						>
							<PiHeartBold />
						</button>
						<button
							onClick={() => handleAddTo('watchlist')}
							className='icon-button border-gray-light'
						>
							<PiBookmarkSimpleBold />
						</button>
						<button
							onClick={() => handleAddTo('ignored')}
							className='default-button border-gray-light'
						>
							<PiMinusBold />
							<span className='text-sm'>Dodaj do ignorowanych</span>
						</button>
					</>
				)}
				{(type === 'favorites' ||
					type === 'watchlist' ||
					type === 'ignored') && (
					<button
						onClick={() => {
							handleDeleteFrom(type);
						}}
						className='default-button border-gray-light'
					>
						Usuń
					</button>
				)}
			</div>
			{error && <div className='w-full text-sm mt-4'>{error}</div>}
			{message && <div className='w-full text-sm mt-4'>{message}</div>}
		</div>
	);
};

export default MovieOptions;
