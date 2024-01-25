import { useEffect, useState } from 'react';

import InlineError from '../common/InlineError';
import { Link } from 'react-router-dom';
import LoadingMessage from '../common/LoadingMessage';
import { PiMedalFill } from 'react-icons/pi';
import useFetch from '../../hooks/useFetch';

const TopRatedMovies = () => {
	const { fetchData, isLoading, error } = useFetch();
	const [topMovies, setTopMovies] = useState(null);

	useEffect(() => {
		const getTopMovies = async () => {
			if (!isLoading) {
				const movies = await fetchData('movies/top/rated');
				setTopMovies(movies);
			}
		};

		getTopMovies();
	}, []);

	return (
		<div>
			<div className=' mt-6 flex items-center gap-2'>
				<PiMedalFill className='text-2xl text-red-dark' />
				<h3 className='text-2xl font-medium'>Najlepiej oceniane filmy</h3>
			</div>
			<p className='mt-2 mb-4 text-gray-light font-medium'>
				Top 5 najlepiej ocenianych filmów
			</p>
			{isLoading && <LoadingMessage message='Ładowanie listy filmów...' />}
			{error && <InlineError error={error} />}
			{topMovies && (
				<div className='overflow-x-scroll'>
					<table className='w-full'>
						<thead>
							<tr>
								<th>Pozycja</th>
								<th>Tytuł filmu</th>
								<th>Ocena</th>
							</tr>
						</thead>
						<tbody>
							{topMovies.map((movie, index) => (
								<tr key={movie._id}>
									<td>{index + 1}</td>
									<td>
										<Link to={`/filmy/${movie._id}`}>{movie.title}</Link>
									</td>
									<td>{movie.rate.toFixed(1)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default TopRatedMovies;
