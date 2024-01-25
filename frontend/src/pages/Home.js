import MostPopularMovies from '../components/home/MostPopularMovies';
import TopActiveUsers from '../components/home/TopActiveUsers';
import TopRatedMovies from '../components/home/TopRatedMovies';

const Home = () => {
	return (
		<div className='main-container'>
			<MostPopularMovies />
			<TopRatedMovies />
			<TopActiveUsers />
		</div>
	);
};

export default Home;
