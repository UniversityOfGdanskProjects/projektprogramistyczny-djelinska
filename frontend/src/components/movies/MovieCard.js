import { PiCalendarBlankBold, PiClockBold } from 'react-icons/pi';

import IconText from './IconText';
import { Link } from 'react-router-dom';
import MovieOptions from './MovieOptions';
import MovieRating from './MovieRating';
import { useMoviesContext } from '../../contexts/MoviesProvider';

const MovieCard = ({ movie, simple, type, handleChange }) => {
	const { convertMovieTime } = useMoviesContext();

	return (
		<div className='movie-card-container'>
			<Link
				to={`/filmy/${movie._id}`}
				className='bg-black-dark w-full sm:w-48 h-64 rounded-l-md overflow-hidden'
			>
				<img
					src={movie.poster_image}
					alt={movie.title}
					className='object-cover w-full h-full transition ease-in-out duration-300 hover:scale-105'
				/>
			</Link>
			<div className='p-6'>
				<Link to={`/filmy/${movie._id}`}>
					<h3 className='text-xl font-semibold mb-2'>{movie.title}</h3>
				</Link>
				{!simple && (
					<MovieRating
						rate={movie.rate}
						rating_count={movie.rating_count}
						size='small'
					/>
				)}
				<div className='uppercase text-sm mt-6 mb-2'>{movie.genre}</div>
				<div className='flex items-center gap-4'>
					<IconText
						icon={PiClockBold}
						label={convertMovieTime(movie.duration_time)}
						size='small'
					/>
					<IconText
						icon={PiCalendarBlankBold}
						label={movie.release_year}
						size='small'
					/>
				</div>
				<MovieOptions
					movieId={movie._id}
					type={type}
					handleChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default MovieCard;
