import { PiUserCircleFill } from 'react-icons/pi';
import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';

const Profile = ({ username }) => {
	const [isDropdown, setIsDropdown] = useState(false);

	const handleShowDropdown = () => {
		setIsDropdown(!isDropdown);
	};

	return (
		<div className='relative'>
			<button onClick={handleShowDropdown} className='flex items-center gap-2'>
				<span>{username}</span>
				<PiUserCircleFill style={{ fontSize: '40px' }} />
			</button>
			{isDropdown && <ProfileDropdown username={username} />}
		</div>
	);
};

export default Profile;
