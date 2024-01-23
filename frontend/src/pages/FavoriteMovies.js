import { useEffect, useState } from 'react';

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
			<h3 className='text-xl font-semibold mb-4'>Lista ulubionych filmów</h3>
			{isLoading && <div>Ładowanie filmów...</div>}
			{error && <div>{error} </div>}
			{favorites.length > 0 ? (
				<div className='grid grid-cols-2 gap-6'>
					{favorites.map((movie) => (
						<MovieCard
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
