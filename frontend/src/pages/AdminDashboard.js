import AddMovieForm from '../components/admin/AddMovieForm';
import AdminCommentsList from '../components/admin/AdminCommentsList';
import AdminMoviesList from '../components/admin/AdminMoviesList';
import AdminUsersList from '../components/admin/AdminUsersList';
import { useState } from 'react';

const AdminDashboard = () => {
	const [dataType, setDataType] = useState('');

	return (
		<div className='pt-navbar my-6 w-full max-w-screen-lg'>
			<h2 className='mb-4'>Panel zarządzania</h2>
			<div className='flex gap-6 mb-4'>
				<button
					onClick={() => setDataType('addMovie')}
					className='default-button'
				>
					Dodaj film
				</button>
				<button
					onClick={() => setDataType('movies')}
					className='default-button'
				>
					Pokaż listę filmów
				</button>
				<button onClick={() => setDataType('users')} className='default-button'>
					Pokaż listę użytkowników
				</button>
				<button
					onClick={() => setDataType('comments')}
					className='default-button'
				>
					Pokaż listę komentarzy
				</button>
			</div>
			{dataType === 'addMovie' && <AddMovieForm />}
			{dataType === 'movies' && <AdminMoviesList />}
			{dataType === 'users' && <AdminUsersList />}
			{dataType === 'comments' && <AdminCommentsList />}
		</div>
	);
};

export default AdminDashboard;
