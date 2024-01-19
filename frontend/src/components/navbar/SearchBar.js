import { PiMagnifyingGlassBold } from 'react-icons/pi';

const SearchBar = () => {
	return (
		<div className='flex items-center min-h-12'>
			<button className='icon-button border-white'>
				<PiMagnifyingGlassBold />
			</button>
			<input
				type='text'
				placeholder='Szukaj filmów'
				className='px-4 py-2 bg-transparent border-none placeholder:text-gray-light focus:ring-0'
			/>
		</div>
	);
};

export default SearchBar;
