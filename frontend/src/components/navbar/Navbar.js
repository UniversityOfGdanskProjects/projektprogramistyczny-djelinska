import { Link, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';

import Logo from '../common/Logo';
import MobileMenu from './MobileMenu';
import Profile from './Profile';
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
	const [isMobile, setIsMobile] = useState(false);

	useLayoutEffect(() => {
		const checkWindowSize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		checkWindowSize();

		window.addEventListener('resize', checkWindowSize);

		return () => {
			window.removeEventListener('resize', checkWindowSize);
		};
	}, []);

	return (
		<nav className='fixed top-0 z-10 w-full text-sm px-6 py-3 bg-black-dark border-b border-gray-dark flex items-center justify-between gap-6 shadow-lg'>
			<Logo />
			{!isMobile && (
				<div className='flex gap-6 mr-auto'>
					{links.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							className={`${
								location.pathname === link.path
									? 'font-semibold'
									: 'font-normal'
							}`}
						>
							{link.name}
						</Link>
					))}
					{user && !user.is_user ? (
						<Link to='/panel'>Panel zarządzania</Link>
					) : null}
				</div>
			)}
			{!isMobile && !user && (
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
			)}
			{!isMobile && user && <Profile username={user.username} />}
			{isMobile && <MobileMenu />}
		</nav>
	);
};

export default Navbar;
