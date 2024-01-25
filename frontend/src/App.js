import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';

import AdminDashboard from './pages/AdminDashboard';
import FavoriteMovies from './pages/FavoriteMovies';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import IgnoredMovies from './pages/IgnoredMovies';
import LoginForm from './pages/LoginForm';
import MovieDetails from './pages/MovieDetails';
import Movies from './pages/Movies';
import Navbar from './components/navbar/Navbar';
import NotFound from './pages/NotFound';
import ProfileInfo from './pages/ProfileInfo';
import SignupForm from './pages/SignupForm';
import WatchListMovies from './pages/WatchListMovies';
import { useAuthContext } from './contexts/AuthProvider';

function App() {
	const { user } = useAuthContext();
	const isAdmin = localStorage.getItem('user')
		? !JSON.parse(localStorage.getItem('user')).is_user
		: false;

	return (
		<Router>
			<div className='min-h-screen w-full flex flex-col items-center'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/panel'
						element={isAdmin ? <AdminDashboard /> : <Navigate to='/' />}
					/>
					<Route
						path='/rejestracja'
						element={!user ? <SignupForm /> : <Navigate to='/' />}
					/>
					<Route
						path='/login'
						element={!user ? <LoginForm /> : <Navigate to='/' />}
					/>
					<Route path='/filmy' element={<Movies />} />
					<Route path='/filmy/:id' element={<MovieDetails />} />
					<Route
						path='/profil'
						element={user ? <ProfileInfo /> : <Navigate to='/login' />}
					/>
					<Route
						path='/profil/ulubione'
						element={user ? <FavoriteMovies /> : <Navigate to='/login' />}
					/>
					<Route
						path='/profil/zapisane'
						element={user ? <WatchListMovies /> : <Navigate to='/login' />}
					/>
					<Route
						path='/profil/ignorowane'
						element={user ? <IgnoredMovies /> : <Navigate to='/login' />}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
