import { useEffect, useState } from 'react';

import InlineError from '../components/common/InlineError';
import LoadingMessage from '../components/common/LoadingMessage';
import MovieCard from '../components/movies/MovieCard';
import useFetch from '../hooks/useFetch';

const FavoriteMovies = () => {
	const [favorites, setFavorites] = useState([]);
	const { fetchData, isLoading, error } = useFetch();

	const getFavorites = async () => {
		const favorites = await fetchData('users/favorites');
		setFavorites(favorites);
	};

	useEffect(() => {
		getFavorites();
	}, []);

	return (
		<div className='w-full pt-navbar mt-6 max-w-screen-lg'>
			<h2 className='mb-4'>Lista ulubionych filmów</h2>
			{isLoading && <LoadingMessage message='Ładowanie filmów...' />}
			{error && <InlineError error={error} />}
			{favorites.length > 0 ? (
				<div className='grid grid-cols-2 gap-6 mt-4'>
					{favorites.map((movie) => (
						<MovieCard
							key={movie._id}
							movie={movie}
							simple={true}
							type='favorites'
							handleChange={getFavorites}
						/>
					))}
				</div>
			) : (
				<div>Brak ulubionych filmów</div>
			)}
		</div>
	);
};

export default FavoriteMovies;
