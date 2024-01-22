import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchData = async (endpoint) => {
		setIsLoading(true);

		const response = await fetch(`http://localhost:5000/api/${endpoint}`);
		const responseBody = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(responseBody.error);
		} else {
			setIsLoading(false);
			return responseBody;
		}
	};

	return { fetchData, isLoading, error };
};

export default useFetch;
