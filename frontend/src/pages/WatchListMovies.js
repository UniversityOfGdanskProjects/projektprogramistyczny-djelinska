import { useEffect, useState } from 'react';

import MovieCard from '../components/movies/MovieCard';
import useFetch from '../hooks/useFetch';

const WatchListMovies = () => {
	const [watchlist, setWatchlist] = useState([]);
	const { fetchData, isLoading, error } = useFetch();

	const getWatchlist = async () => {
		const watchlist = await fetchData('users/watchlist');
		setWatchlist(watchlist);
	};

	useEffect(() => {
		getWatchlist();
	}, []);

	return (
		<div className='w-full pt-navbar mt-6 max-w-screen-lg'>
			<h3 className='text-xl font-semibold mb-4'>Lista filmów do obejrzenia</h3>
			{isLoading && <div>Ładowanie filmów...</div>}
			{error && <div>{error} </div>}
			{watchlist.length > 0 ? (
				<div className='grid grid-cols-2 gap-6'>
					{watchlist.map((movie) => (
						<MovieCard
							movie={movie}
							simple={true}
							type='watchlist'
							handleChange={getWatchlist}
						/>
					))}
				</div>
			) : (
				<div>Brak zapisanych filmów do objerzenia</div>
			)}
		</div>
	);
};

export default WatchListMovies;
