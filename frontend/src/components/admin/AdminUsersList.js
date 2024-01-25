import { useEffect, useState } from 'react';

import InlineError from '../common/InlineError';
import InlineMessage from '../common/InlineMessage';
import { PiTrashSimpleBold } from 'react-icons/pi';
import { useAuthContext } from '../../contexts/AuthProvider';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const AdminUsersList = () => {
	const [users, setUsers] = useState(null);
	const { fetchData, isLoading: fetchLoading, error: fetchError } = useFetch();
	const { deleteData, isLoading: deleteLoading, message } = useDelete();
	const [deleteError, setDeleteError] = useState('');
	const navigate = useNavigate();
	const { user } = useAuthContext();

	const getUsers = async () => {
		const users = await fetchData('admin/users');
		setUsers(users);
	};

	const handleDelete = (userId) => {
		setDeleteError('');

		if (user) {
			if (!deleteLoading) {
				deleteData(`admin/users/${userId}`)
					.then(() => getUsers())
					.catch((err) => setDeleteError(err.message));
			}
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		if (!fetchLoading) {
			getUsers();
		}
	}, []);

	return (
		<div>
			{fetchError && <InlineError error={fetchError} />}
			{deleteError && <InlineError error={deleteError} />}
			{message && <InlineMessage message={message} />}
			{users && (
				<div className='overflow-x-scroll'>
					<table className='w-full'>
						<thead>
							<tr>
								<th>Nazwa użytkownika</th>
								<th>Adres e-mail</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>
										<button
											onClick={() => handleDelete(user._id)}
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
				</div>
			)}
		</div>
	);
};

export default AdminUsersList;
