import axios from 'axios';
import { useState } from 'react';

const useFetch = () => {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const searchData = (endpoint) => {
		setIsLoading(true);
		setError('');
		const response = axios.get(`http://localhost:5000/${endpoint}?year=1994`);
		const data = response.data;

		if (!response.ok) {
			setError(data.error);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			return data;
		}
	};

	return { searchData, isLoading, error };
};

export default useFetch;
