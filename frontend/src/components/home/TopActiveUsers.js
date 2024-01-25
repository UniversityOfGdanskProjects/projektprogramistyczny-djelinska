import { useEffect, useState } from 'react';

import InlineError from '../common/InlineError';
import { Link } from 'react-router-dom';
import LoadingMessage from '../common/LoadingMessage';
import { PiMedalFill } from 'react-icons/pi';
import useFetch from '../../hooks/useFetch';

const TopActiveUsers = () => {
	const { fetchData, isLoading, error } = useFetch();
	const [topUsers, setTopUsers] = useState(null);

	useEffect(() => {
		const getTopUsers = async () => {
			if (!isLoading) {
				const users = await fetchData('users/top/active');
				setTopUsers(users);
			}
		};

		getTopUsers();
	}, []);

	return (
		<div>
			<div className=' mt-6 flex items-center gap-2'>
				<PiMedalFill className='text-2xl text-red-dark' />
				<h3 className='text-2xl font-medium'>
					Najbardziej aktywni użytkownicy
				</h3>
			</div>
			<p className='mt-2 mb-4 text-gray-light font-medium'>
				Top 5 najbardziej aktywnych użytkowników
			</p>
			{isLoading && (
				<LoadingMessage message='Ładowanie listy użytkowników...' />
			)}
			{error && <InlineError error={error} />}
			{topUsers && (
				<table className='w-full'>
					<thead>
						<tr>
							<th>Pozycja</th>
							<th>Nazwa użytkownika</th>
							<th>Liczba interakcji</th>
						</tr>
					</thead>
					<tbody>
						{topUsers.map((user, index) => (
							<tr key={user._id}>
								<td>{index + 1}</td>
								<td>{user.username}</td>
								<td>{user.totalInteractions}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TopActiveUsers;
