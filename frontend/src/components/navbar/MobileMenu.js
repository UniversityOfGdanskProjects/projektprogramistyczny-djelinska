import { PiListBold, PiUserCircleFill } from 'react-icons/pi';

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthProvider';
import useLogout from '../../hooks/useLogout';
import { useState } from 'react';

const MobileMenu = () => {
	const links = [
		{ name: 'Strona główna', path: '/' },
		{ name: 'Filmy', path: '/filmy' },
		{ name: 'Moja lista ulubionych', path: '/profil/ulubione' },
		{ name: 'Moja lista do obejrzenia', path: '/profil/zapisane' },
		{ name: 'Lista ignorowanych', path: '/profil/ignorowane' },
	];
	const { user } = useAuthContext();
	const { logout } = useLogout();
	const [isDropdown, setIsDropdown] = useState(true);

	const handleShowDropdown = () => {
		setIsDropdown(!isDropdown);
	};

	return (
		<div className='relative'>
			<button
				onClick={handleShowDropdown}
				className='bg-black-light p-2 rounded-md'
			>
				<PiListBold className='text-2xl' />
			</button>
			{isDropdown && (
				<div className='bg-black-light text-white rounded-xl py-4 shadow-xl absolute top-12 right-0 flex flex-col gap-4'>
					{user && (
						<Link to='/profil' className='flex items-center gap-2 px-6'>
							<PiUserCircleFill className='text-2xl' />
							<span className='text-lg font-medium'>{user.username}</span>
						</Link>
					)}
					{!user && (
						<div className='px-6 space-y-4'>
							<Link to='/login' className='default-button border-neutral-300'>
								Zaloguj się
							</Link>
							<Link
								to='/rejestracja'
								className='default-button bg-white text-black-light font-medium'
							>
								Zarejestruj się
							</Link>
						</div>
					)}
					<div className='flex flex-col gap-6 mr-auto'>
						{links.map((link) => (
							<Link key={link.path} to={link.path} className='px-6'>
								{link.name}
							</Link>
						))}
						{user && !user.is_user ? (
							<Link to='/panel' className='px-6'>
								Panel zarządzania
							</Link>
						) : null}
					</div>
					{user && (
						<button onClick={logout} className='border-t border-gray-dark pt-4'>
							Wyloguj się
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default MobileMenu;
