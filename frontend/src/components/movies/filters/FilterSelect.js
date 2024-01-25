import { useEffect, useState } from 'react';

import useFetch from '../../../hooks/useFetch';

const FilterSelect = ({ type, label, value, handleSelect }) => {
	const { fetchData } = useFetch();
	const [selectData, setSelectData] = useState(null);

	useEffect(() => {
		const getSelectData = async () => {
			const selectData = await fetchData(`movies/${type}s`);
			setSelectData(selectData);
		};

		getSelectData();
	}, []);

	return (
		<select
			name={type}
			id={type}
			value={value}
			onChange={handleSelect}
			className='default-button movies-select'
		>
			<option value=''>{label}</option>
			{selectData &&
				selectData.map((data) => (
					<option key={data._id} value={data._id}>
						{data._id}
					</option>
				))}
		</select>
	);
};

export default FilterSelect;
