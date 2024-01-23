import { useAuthContext } from '../../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import usePost from '../../../hooks/usePost';
import { useState } from 'react';

const AddComment = ({ movieId, handleChange }) => {
	const [comment, setComment] = useState('');
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const { postData, isLoading, message } = usePost();
	const [error, setError] = useState('');

	const handleAddComment = async (e) => {
		e.preventDefault();
		setError('');

		if (user) {
			if (!isLoading) {
				try {
					await postData('movies/comment/add', {
						movie_id: movieId,
						comment: comment,
					});
					handleChange();
					setComment('');
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
			<h3 className='w-full text-xl font-semibold mb-4'>Dodaj komentarz</h3>
			<form
				method='post'
				onSubmit={handleAddComment}
				className='flex items-center gap-4 flex-wrap'
			>
				<textarea
					name='comment'
					id='comment'
					placeholder='Napisz komentarz'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className='form-textarea w-full max-w-96 mr-2'
				></textarea>
				<button type='submit' className='default-button h-fit'>
					Dodaj komentarz
				</button>
				{error && <div className='w-full text-sm'>{error}</div>}
				{message && <div className='w-full text-sm'>{message}</div>}
			</form>
		</div>
	);
};

export default AddComment;
