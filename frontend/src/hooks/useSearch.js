import { useState } from 'react';

const useSearch = () => {
	const [isLoading, setIsLoading] = useState(false);

	const searchData = async (params) => {
		setIsLoading(true);
		const searchParams = new URLSearchParams(params);

		const response = await fetch(
			`http://localhost:5000/api/movies?${searchParams.toString()}`
		);
		const responseBody = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			throw Error(responseBody.error);
		} else {
			setIsLoading(false);
			return responseBody;
		}
	};

	return { searchData, isLoading };
};

export default useSearch;
