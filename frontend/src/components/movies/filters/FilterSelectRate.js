const FilterSelectRate = ({ value, handleSelect }) => {
	return (
		<select
			name='rate'
			id='rate'
			value={value}
			onChange={handleSelect}
			className='default-button movies-select'
		>
			<option value=''>Wybierz ocenę użytkowników</option>
			<option value='5'>4 - 5 gwiazdek</option>
			<option value='4'>3 - 4 gwiazdki</option>
			<option value='3'>2 - 3 gwiazdki</option>
			<option value='2'>1 - 2 gwiazdki</option>
			<option value='1'>0 - 1 gwiazdek</option>
		</select>
	);
};

export default FilterSelectRate;
