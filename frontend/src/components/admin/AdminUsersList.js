import { useEffect, useState } from 'react';

import { PiTrashSimpleBold } from 'react-icons/pi';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';

const AdminUsersList = () => {
	const [users, setUsers] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const { deleteData } = useDelete();

	const getUsers = async () => {
		const users = await fetchData('admin/users');
		setUsers(users);
	};

	const handleDelete = async (userId) => {
		await deleteData(`admin/users/${userId}`);
		getUsers();
	};

	useEffect(() => {
		if (!isLoading) {
			getUsers();
		}
	}, []);

	return (
		<div>
			{error && <div>{error}</div>}
			{users && (
				<table className=''>
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
			)}
		</div>
	);
};

export default AdminUsersList;
