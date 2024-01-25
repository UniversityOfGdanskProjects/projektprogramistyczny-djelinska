import MostPopularMovies from '../components/home/MostPopularMovies';
import TopActiveUsers from '../components/home/TopActiveUsers';
import TopRatedMovies from '../components/home/TopRatedMovies';

const Home = () => {
	return (
		<div className='w-full pt-navbar my-6 max-w-screen-lg'>
			<MostPopularMovies />
			<TopRatedMovies />
			<TopActiveUsers />
		</div>
	);
};

export default Home;
