import { useEffect, useState } from 'react';

import FilterSelect from './FilterSelect';
import FilterSelectRate from './FilterSelectRate';
import { useMoviesContext } from '../../../contexts/MoviesProvider';

const Filter = () => {
	const [genre, setGenre] = useState('');
	const [year, setYear] = useState('');
	const [rate, setRate] = useState('');
	const { state, setFilters, resetSearch, isLoading } = useMoviesContext();

	const handleFilter = () => {
		if (!isLoading) {
			setFilters({ genre, year, rate });
		}
	};

	const handleReset = () => {
		setGenre('');
		setYear('');
		setRate('');
		resetSearch();
	};

	useEffect(() => {
		handleReset();
	}, [state.title]);

	return (
		<div className='flex flex-col gap-2 mb-4'>
			<span className='text-sm'>Filtrowanie:</span>
			<div className='flex gap-6'>
				<FilterSelect
					type='genre'
					label='Wybierz gatunek'
					value={genre}
					handleSelect={(e) => setGenre(e.target.value)}
				/>
				<FilterSelect
					type='year'
					label='Wybierz rok produkcji'
					value={year}
					handleSelect={(e) => setYear(e.target.value)}
				/>
				<FilterSelectRate
					value={rate}
					handleSelect={(e) => setRate(e.target.value)}
				/>
				<button
					onClick={handleFilter}
					className='default-button border-gray-light bg-black-dark'
				>
					Wyszukaj
				</button>
				<button
					onClick={handleReset}
					className='default-button border-gray-dark bg-black-dark'
				>
					Wyczyść
				</button>
			</div>
		</div>
	);
};

export default Filter;
