import { PiCalendarBlankBold, PiClockBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';

import ActorCard from '../components/movies/details/ActorCard';
import AddComment from '../components/movies/details/AddComment';
import AddRating from '../components/movies/details/AddRating';
import CommentsList from '../components/movies/details/CommentsList';
import IconText from '../components/movies/IconText';
import MovieOptions from '../components/movies/MovieOptions';
import MovieRating from '../components/movies/MovieRating';
import MovieTrailer from '../components/movies/details/MovieTrailer';
import NotFound from './NotFound';
import useFetch from '../hooks/useFetch';
import { useMoviesContext } from '../contexts/MoviesProvider';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
	const [movie, setMovie] = useState(null);
	const { fetchData, error } = useFetch();
	const { convertMovieTime } = useMoviesContext();
	const { id } = useParams();

	const getMovie = async () => {
		const movie = await fetchData(`movies/movie/${id}`);
		setMovie(movie);
	};

	useEffect(() => {
		getMovie();
	}, []);

	return (
		<div>
			{error && <NotFound />}
			{movie && (
				<div className='w-full pt-navbar bg-black-dark'>
					<div className='flex flex-col gap-6 p-6 mx-auto w-full max-w-screen-lg'>
						<div className='flex gap-6'>
							<div className='w-80 h-96 rounded-md overflow-hidden bg-black-light'>
								<img
									src={movie.poster_image}
									alt={movie.title}
									className='w-full h-full object-cover'
								/>
							</div>
							<div className='flex flex-col justify-center'>
								<h3 className='font-semibold text-3xl'>{movie.title}</h3>
								<div className='flex items-center gap-4 my-4'>
									<IconText
										icon={PiClockBold}
										label={convertMovieTime(movie.duration_time)}
										size='large'
									/>
									<IconText
										icon={PiCalendarBlankBold}
										label={movie.release_year}
										size='large'
									/>
								</div>
								<MovieRating
									rate={movie.rate}
									rating_count={movie.rating_count}
									size='large'
								/>
								<div className='flex gap-6 my-4'>
									<div className='text-sm text-gray-light'>
										gatunek:{' '}
										<span className='uppercase text-base text-white'>
											{movie.genre}
										</span>
									</div>
									<div className='text-sm text-gray-light'>
										reżyseria:{' '}
										<span className='uppercase text-base text-white'>
											{movie.director}
										</span>
									</div>
								</div>
								<p>{movie.description}</p>
								<MovieOptions />
							</div>
						</div>
						{movie.video_url && (
							<MovieTrailer videoUrl={movie.video_url} title={movie.title} />
						)}
						<div>
							<h3 className='text-xl font-semibold mb-4'>Główni aktorzy</h3>
							<div className='grid grid-cols-4 gap-6'>
								{movie.actors.map((actor) => (
									<ActorCard key={actor._id} actor={actor} />
								))}
							</div>
						</div>
						<AddRating movieId={movie._id} handleChange={getMovie} />
						<AddComment movieId={movie._id} handleChange={getMovie} />
						{movie.comments.length > 0 && (
							<CommentsList comments={movie.comments} />
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieDetails;
