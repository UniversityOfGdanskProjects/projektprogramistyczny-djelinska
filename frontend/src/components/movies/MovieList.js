import MovieCard from './MovieCard';

const MovieList = ({ moviesData }) => {
	const { movies, moviesCount } = moviesData;

	return (
		<div>
			<p>
				Znaleziono <span className='text-lg font-semibold'>{moviesCount}</span>{' '}
				filmów
			</p>
			<div className='flex flex-col gap-6 mt-4'>
				{movies.map((movie) => (
					<MovieCard key={movie._id} movie={movie} simple={false} type='list' />
				))}
			</div>
		</div>
	);
};

export default MovieList;
