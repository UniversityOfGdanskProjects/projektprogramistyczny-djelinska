import { PiHeartBold, PiHeartFill } from 'react-icons/pi';
import { useEffect, useState } from 'react';

import InlineError from '../common/InlineError';
import { Link } from 'react-router-dom';
import LoadingMessage from '../common/LoadingMessage';
import useFetch from '../../hooks/useFetch';

const MostPopularMovies = () => {
	const { fetchData, isLoading, error } = useFetch();
	const [topMovies, setTopMovies] = useState(null);

	useEffect(() => {
		const getTopMovies = async () => {
			if (!isLoading) {
				const movies = await fetchData('movies/top/popular');
				setTopMovies(movies);
			}
		};

		getTopMovies();
	}, []);

	return (
		<div>
			<div className='flex items-center gap-2'>
				<PiHeartFill className='text-2xl text-red-dark' />
				<h3 className='text-2xl font-medium'>Najbardziej popularne filmy</h3>
			</div>
			<p className='mt-2 mb-4 text-gray-light font-medium'>
				Najczęściej dodawane do ulubionych
			</p>
			{isLoading && <LoadingMessage message='Ładowanie filmów...' />}
			{error && <InlineError error={error} />}
			{topMovies && (
				<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
					{topMovies.map((movie) => (
						<div key={movie._id} className='bg-black-dark p-4 rounded-md'>
							<Link to={`/filmy/${movie._id}`}>
								<div className='h-80 overflow-hidden'>
									<img
										src={movie.poster_image}
										alt={movie.title}
										className='object-cover w-full h-full transition ease-in-out duration-300 hover:scale-105'
									/>
								</div>
							</Link>
							<Link to={`/filmy/${movie._id}`}>
								<h3 className='mt-4'>{movie.title}</h3>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MostPopularMovies;
