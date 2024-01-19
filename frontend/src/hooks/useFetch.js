import axios from 'axios';
import { useState } from 'react';

const useFetch = () => {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = (endpoint) => {
		setIsLoading(true);
		setError('');
		const response = axios.get(`http://localhost:5000/${endpoint}`);
		const data = response.data;

		if (!response.ok) {
			setError(data.error);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			return data;
		}
	};

	return { fetchData, isLoading, error };
};

export default useFetch;
