import { useAuthContext } from '../contexts/AuthProvider';
import { useState } from 'react';

const usePost = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { user } = useAuthContext();

	const postData = async (endpoint, data) => {
		setIsLoading(true);
		setMessage('');

		const response = await fetch(
			`http://localhost:5000/api/movies/${endpoint}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(data),
			}
		);

		const responseBody = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			throw Error(responseBody.error);
		} else {
			setIsLoading(false);
			setMessage(responseBody.message);
		}
	};

	return { postData, isLoading, message };
};

export default usePost;
