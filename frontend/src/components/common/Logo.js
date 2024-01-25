import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link to='/' className='flex items-center h-12'>
			<h1 className='text-red-light text-xl font-semibold'>MO^IES</h1>
		</Link>
	);
};

export default Logo;
