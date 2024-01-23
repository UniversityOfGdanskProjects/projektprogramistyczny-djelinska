const AdminDashboard = () => {
	return (
		<div className='pt-navbar mt-6 w-full max-w-screen-lg'>
			<h3 className='text-lg font-semibold mb-4'>Panel zarządzania</h3>
			<div className='flex gap-6'>
				<button className='default-button'>Pokaż listę filmów</button>
				<button className='default-button'>Pokaż listę użytkowników</button>
				<button className='default-button'>Pokaż listę komentarzy</button>
			</div>
		</div>
	);
};

export default AdminDashboard;
