import { useAuthContext } from '../contexts/AuthProvider';
import { useState } from 'react';

const useDelete = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { user } = useAuthContext();

	const deleteData = async (endpoint) => {
		setIsLoading(true);
		setMessage('');

		const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const responseBody = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			throw Error(responseBody.error);
		} else {
			setIsLoading(false);
			setMessage(responseBody.message);
		}
	};

	return { deleteData, isLoading, message };
};

export default useDelete;
