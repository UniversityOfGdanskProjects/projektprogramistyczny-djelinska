import { useEffect, useState } from 'react';

import InlineError from '../components/common/InlineError';
import LoadingMessage from '../components/common/LoadingMessage';
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
			<h2 className='mb-4'>Lista filmów do obejrzenia</h2>
			{isLoading && <LoadingMessage message='Ładowanie filmów...' />}
			{error && <InlineError error={error} />}
			{watchlist.length > 0 ? (
				<div className='grid grid-cols-2 gap-6 mt-4'>
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
				<div>Brak filmów zapisanych do obejrzenia</div>
			)}
		</div>
	);
};

export default WatchListMovies;
