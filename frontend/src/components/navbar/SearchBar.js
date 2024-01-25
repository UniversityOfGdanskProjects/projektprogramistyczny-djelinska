import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useMoviesContext } from '../../contexts/MoviesProvider';
import { useState } from 'react';

const SearchBar = () => {
	const [searchInput, setSearchInput] = useState('');
	const { state, setSearch, isLoading } = useMoviesContext();

	const handleSearch = () => {
		if (!isLoading && searchInput !== state.query) {
			setSearch({ query: searchInput });
		}
	};

	return (
		<div className='flex items-center min-h-12'>
			<button
				onClick={handleSearch}
				disabled={isLoading}
				className='icon-button border-white'
			>
				<PiMagnifyingGlassBold />
			</button>
			<input
				type='text'
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				placeholder='Szukaj filmów według tytułu, gatunku, reżysera, aktora'
				className='px-4 py-2 w-full bg-transparent border-none placeholder:text-gray-light focus:ring-0'
			/>
		</div>
	);
};

export default SearchBar;
