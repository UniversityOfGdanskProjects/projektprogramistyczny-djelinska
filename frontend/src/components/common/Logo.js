import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link
			to='/'
			className='flex items-center text-red-light text-xl font-semibold h-12'
		>
			MO^IES
		</Link>
	);
};

export default Logo;
