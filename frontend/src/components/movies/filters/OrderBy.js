import { useEffect, useState } from 'react';

import { useMoviesContext } from '../../../contexts/MoviesProvider';

const OrderBy = () => {
	const [orderSelect, setOrderSelect] = useState('rate.desc');
	const { state, setOrder, resetSearch, isLoading } = useMoviesContext();

	const handleOrderBy = (orderType) => {
		setOrderSelect(orderType);

		if (!isLoading) {
			const order_by = orderType.split('.')[0];
			const order = orderType.split('.')[1];

			setOrder({ order_by, order });
		}
	};

	useEffect(() => {
		setOrderSelect('rate.desc');
		resetSearch();
	}, [state.title]);

	return (
		<div className='flex flex-col gap-2 mb-4'>
			<label htmlFor='order' className='text-sm'>
				Sortowanie:
			</label>
			<select
				name='order'
				id='order'
				value={orderSelect}
				onChange={(e) => handleOrderBy(e.target.value)}
				className='default-button movies-select'
			>
				<option value='rate.desc'>Ocena: od najwyższej</option>
				<option value='rate.asc'>Ocena: od najniższej</option>
				<option value='rating_count.desc'>Liczba ocen: od najwyższej</option>
				<option value='rating_count.asc'>Liczba ocen: od najniższej</option>
				<option value='release_year.desc'>Rok produkcji od najnowszych</option>
				<option value='release_year.asc'>Rok produkcji: od najstarszych</option>
			</select>
		</div>
	);
};

export default OrderBy;
