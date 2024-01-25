import { useAuthContext } from '../contexts/AuthProvider';
import { useState } from 'react';

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { user } = useAuthContext();

	const fetchData = async (endpoint) => {
		setIsLoading(true);
		let headerObj = null;

		if (user) {
			headerObj = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
		}

		const response = await fetch(
			`http://localhost:5000/api/${endpoint}`,
			headerObj
		);
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
