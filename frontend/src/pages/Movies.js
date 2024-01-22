import { useEffect, useRef } from 'react';

import Filter from '../components/movies/filters/Filter';
import MovieList from '../components/movies/MovieList';
import OrderBy from '../components/movies/filters/OrderBy';
import Pagination from '../components/movies/Pagination';
import SearchBar from '../components/navbar/SearchBar';
import { useMoviesContext } from '../contexts/MoviesProvider';

const Movies = () => {
	const moviesListRef = useRef(null);
	const { state, setPage, setSearch, isLoading, error, moviesData } =
		useMoviesContext();

	const changePage = (pageNumber) => {
		setPage(pageNumber);
		moviesListRef.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		setSearch();
	}, []);

	return (
		<div
			ref={moviesListRef}
			className='px-6 pt-navbar mt-6 pb-6 w-full max-w-screen-lg'
		>
			<SearchBar />
			<h2 className='mt-6 mb-4'>Lista filmów</h2>
			<div className='flex flex-col gap-2'>
				<Filter />
				<OrderBy />
			</div>
			{isLoading && <div>Ładowanie filmów...</div>}
			{error && <div>{error} </div>}
			{moviesData && (
				<>
					<MovieList moviesData={moviesData} />
					<Pagination
						currentPage={state.page}
						totalPages={moviesData.totalPages}
						changePage={changePage}
					/>
				</>
			)}
		</div>
	);
};

export default Movies;
