import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';

import useSearch from '../hooks/useSearch';

const MoviesContext = createContext();
export const useMoviesContext = () => useContext(MoviesContext);

const searchReducer = (state, action) => {
	switch (action.type) {
		case 'RESET_SEARCH':
			return {
				query: state.query ? state.query : '',
				order_by: state.order_by,
				order: state.order,
				page: 1,
			};
		case 'SET_SEARCH':
			return {
				page: 1,
				order_by: 'rate',
				order: 'desc',
				...action.query,
			};
		case 'SET_FILTERS':
			return { ...state, page: 1, ...action.filters };
		case 'SET_ORDER':
			return { ...state, page: 1, ...action.order };
		case 'SET_PAGE':
			return { ...state, page: action.page };
		default:
			return state;
	}
};

const MoviesProvider = ({ children }) => {
	const { searchData, isLoading } = useSearch();
	const [moviesData, setMoviesData] = useState(null);
	const [error, setError] = useState('');
	const [state, dispatch] = useReducer(searchReducer, {
		page: 1,
		order_by: 'rate',
		order: 'desc',
	});

	async function getMovies() {
		try {
			const moviesData = await searchData(state);
			setMoviesData(moviesData);
		} catch (err) {
			setError(err.message);
		}
	}

	useEffect(() => {
		getMovies();
	}, [state]);

	function convertMovieTime(movieHours) {
		const hours = Math.floor(movieHours);
		const minutes = Math.round((movieHours - hours) * 60);

		const hoursText = hours > 0 ? `${hours}h` : '';
		const minutesText = minutes > 0 ? `${minutes}min` : '';

		return `${hoursText} ${minutesText}`;
	}

	function resetSearch() {
		dispatch({ type: 'RESET_SEARCH' });
	}

	function setSearch(query) {
		dispatch({ type: 'SET_SEARCH', query: query });
	}

	function setFilters(filters) {
		dispatch({ type: 'SET_FILTERS', filters: filters });
	}

	function setOrder(order) {
		dispatch({ type: 'SET_ORDER', order: order });
	}

	function setPage(page) {
		dispatch({ type: 'SET_PAGE', page: page });
	}

	return (
		<MoviesContext.Provider
			value={{
				state,
				convertMovieTime,
				resetSearch,
				setSearch,
				setFilters,
				setOrder,
				setPage,
				moviesData,
				isLoading,
				error,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};

export default MoviesProvider;
