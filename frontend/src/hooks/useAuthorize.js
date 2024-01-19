import { useAuthContext } from '../contexts/AuthProvider';
import { useState } from 'react';

const useAuthorize = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { loginUser } = useAuthContext();

	const authorize = async (endpoint, formData) => {
		setIsLoading(true);

		const response = await fetch(
			`http://localhost:5000/api/users/${endpoint}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			}
		);

		const responseBody = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			throw Error(responseBody.error);
		} else {
			setIsLoading(false);
			localStorage.setItem('user', JSON.stringify(responseBody));
			loginUser(responseBody);
		}
	};

	return { authorize, isLoading };
};

export default useAuthorize;
