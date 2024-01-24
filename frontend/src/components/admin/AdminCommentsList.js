import { useEffect, useState } from 'react';

import { PiTrashSimpleBold } from 'react-icons/pi';
import useFetch from '../../hooks/useFetch';
import useUpdate from '../../hooks/useUpdate';

const AdminCommentsList = () => {
	const [comments, setComments] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const { updateData } = useUpdate();

	const getComments = async () => {
		const comments = await fetchData('admin/comments');
		setComments(comments);
	};

	const handleDelete = async (commentId) => {
		updateData('admin/comments', { commentId });
		getComments();
	};

	useEffect(() => {
		if (!isLoading) {
			getComments();
		}
	}, []);

	return (
		<div>
			{error && <div>{error}</div>}
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
