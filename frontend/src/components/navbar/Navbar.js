import { Link, useLocation } from 'react-router-dom';

import Logo from '../common/Logo';
import Profile from './Profile';
import SearchBar from './SearchBar';
import { useAuthContext } from '../../contexts/AuthProvider';

const Navbar = () => {
	const { user } = useAuthContext();
	const location = useLocation();
	const links = [
		{ name: 'Strona główna', path: '/' },
		{ name: 'Filmy', path: '/filmy' },
		{ name: 'Moja lista ulubionych', path: '/profil/ulubione' },
		{ name: 'Moja lista do obejrzenia', path: '/profil/zapisane' },
	];

	return (
		<nav className='fixed top-0 w-full text-sm px-6 py-3 bg-black-dark border-b border-gray-dark flex items-center justify-between gap-6 shadow-lg'>
			<Logo />
			<SearchBar />
			<div className='ml-auto flex gap-6'>
				{links.map((link) => (
					<Link
						key={link.path}
						to={link.path}
						className={`${
							location.pathname === link.path ? 'font-semibold' : 'font-normal'
						}`}
					>
						{link.name}
					</Link>
				))}
			</div>
			{!user ? (
				<>
					<Link to='/login' className='default-button border-neutral-300'>
						Zaloguj się
					</Link>
					<Link
						to='/rejestracja'
						className='default-button bg-white text-black-light font-medium'
					>
						Zarejestruj się
					</Link>
				</>
			) : (
				<Profile username={user.username} />
			)}
		</nav>
	);
};

export default Navbar;
