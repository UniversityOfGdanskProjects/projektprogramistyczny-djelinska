import { PiStarFill } from 'react-icons/pi';

const MovieRating = ({ rate, rating_count, size }) => {
	const iconSize = size === 'small' ? '20px' : '24px';

	return (
		<div className='movie-card-rating'>
			<PiStarFill style={{ fontSize: iconSize }} />
			<span
				className={`font-medium ${size === 'small' ? 'text-xl' : 'text-2xl'}`}
			>
				{rate.toFixed(1)}
			</span>
			<span
				className={`text-gray-light ${
					size === 'small' ? 'text-sm' : 'text-base'
				}`}
			>
				&#40;{rating_count} ocen&#41;
			</span>
		</div>
	);
};

export default MovieRating;
