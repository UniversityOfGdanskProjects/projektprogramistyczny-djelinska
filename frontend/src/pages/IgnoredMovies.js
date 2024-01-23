import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import MovieOptions from '../components/movies/MovieOptions';
import useFetch from '../hooks/useFetch';

const IgnoredMovies = () => {
	const [ignored, setIgnored] = useState([]);
	const { fetchData, isLoading, error } = useFetch();

	const getIgnored = async () => {
		const ignored = await fetchData('users/ignored');
		setIgnored(ignored);
	};

	useEffect(() => {
		getIgnored();
	}, []);

	return (
		<div className='w-full pt-navbar mt-6 max-w-screen-lg'>
			<h3 className='text-xl font-semibold mb-4'>Lista ignorowanych filmów</h3>
			{isLoading && <div>Ładowanie filmów...</div>}
			{error && <div>{error} </div>}
			{ignored.length > 0 ? (
				<div className='grid grid-col-2 gap-6 w-full'>
					{ignored.map((movie) => (
						<div key={movie._id} className='bg-black-dark p-6 rounded-md'>
							<Link to={`/filmy/${movie._id}`}>
								<h3 className='text-xl font-semibold mb-2'>{movie.title}</h3>
							</Link>
							<div>{movie.genre}</div>
							<MovieOptions
								movieId={movie._id}
								type='ignored'
								handleChange={getIgnored}
							/>
						</div>
					))}
				</div>
			) : (
				<div>Brak ignorowanych filmów</div>
			)}
		</div>
	);
};

export default IgnoredMovies;
