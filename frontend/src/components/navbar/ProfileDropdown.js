import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

const ProfileDropdown = () => {
	const { logout } = useLogout();

	return (
		<div className='bg-black-light text-white rounded-xl py-4 shadow-xl absolute top-12 right-0 flex flex-col gap-4'>
			<Link to='/profil' className='px-6'>
				Konto
			</Link>
			<Link to='/profil/ulubione' className='px-6'>
				Lista ulubionych
			</Link>
			<Link to='profil/zapisane' className='px-6'>
				Lista do objerzenia
			</Link>
			<Link to='profil/ignorowane' className='px-6'>
				Lista ignorowanych
			</Link>
			<button onClick={logout} className='border-t border-gray-dark pt-4'>
				Wyloguj się
			</button>
		</div>
	);
};

export default ProfileDropdown;
