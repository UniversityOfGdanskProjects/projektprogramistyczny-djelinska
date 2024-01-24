import { useEffect, useState } from 'react';

import InlineError from '../common/InlineError';
import InlineMessage from '../common/InlineMessage';
import { PiTrashSimpleBold } from 'react-icons/pi';
import { useAuthContext } from '../../contexts/AuthProvider';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import useUpdate from '../../hooks/useUpdate';

const AdminCommentsList = () => {
	const [comments, setComments] = useState(null);
	const { fetchData, isLoading: fetchLoading, error: fetchError } = useFetch();
	const { updateData, isLoading: updateLoading, message } = useUpdate();
	const [updateError, setUpdateError] = useState('');
	const navigate = useNavigate();
	const { user } = useAuthContext();

	const getComments = async () => {
		const comments = await fetchData('admin/comments');
		setComments(comments);
	};

	const handleDelete = (commentId) => {
		setUpdateError('');

		if (user) {
			if (!updateLoading) {
				updateData('admin/comments', { commentId })
					.then(() => getComments())
					.catch((err) => setUpdateError(err.message));
			}
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		if (!fetchLoading) {
			getComments();
		}
	}, []);

	return (
		<div>
			{fetchError && <InlineError error={fetchError} />}
			{updateError && <InlineError error={updateError} />}
			{message && <InlineMessage message={message} />}
			{comments && (
				<table className=''>
					<thead>
						<tr>
							<th>Nazwa użytkownika</th>
							<th>Tytuł filmu</th>
							<th>Komentarz</th>
						</tr>
					</thead>
					<tbody>
						{comments.map((comment) => (
							<tr key={comment._id}>
								<td>{comment.username}</td>
								<td>{comment.movieTitle}</td>
								<td>{comment.comment}</td>
								<td>
									<button
										onClick={() => handleDelete(comment.id)}
										className='table-button'
									>
										<PiTrashSimpleBold />
										<span>Usuń</span>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default AdminCommentsList;
