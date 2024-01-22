import { PiBookmarkSimpleBold, PiHeartBold } from 'react-icons/pi';

const MovieOptions = () => {
	return (
		<div className='flex items-center gap-4 mt-6'>
			<button className='icon-button border-gray-light'>
				<PiHeartBold />
			</button>
			<button className='default-button border-gray-light'>
				<PiBookmarkSimpleBold />
				<span className='text-sm'>Zapisz do obejrzenia</span>
			</button>
		</div>
	);
};

export default MovieOptions;
