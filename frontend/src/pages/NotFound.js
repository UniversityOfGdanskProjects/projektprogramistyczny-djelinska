import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className='h-screen flex flex-col gap-6 items-center justify-center'>
			<h2>Nie znaleziono strony</h2>
			<p>
				Przepraszamy. Sprawdź poprawność adresu lub wróć do{' '}
				<Link to='/' className='text-red-light'>
					strony głównej
				</Link>
			</p>
		</div>
	);
};

export default NotFound;
