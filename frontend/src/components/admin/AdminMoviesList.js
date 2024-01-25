import {
	PiCheckBold,
	PiNotePencilFill,
	PiTrashSimpleBold,
} from 'react-icons/pi';
import { useEffect, useState } from 'react';

import InlineError from '../common/InlineError';
import InlineMessage from '../common/InlineMessage';
import { useAuthContext } from '../../contexts/AuthProvider';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import useUpdate from '../../hooks/useUpdate';

const AdminMoviesList = () => {
	const [movies, setMovies] = useState(null);
	const { fetchData, isLoading: fetchLoading, error: fetchError } = useFetch();
	const [editedMovie, setEditedMovie] = useState(null);
	const {
		deleteData,
		isLoading: deleteLoading,
		message: deleteMessage,
	} = useDelete();
	const {
		updateData,
		isLoading: updateLoading,
		message: updateMessage,
	} = useUpdate();
	const [error, setError] = useState({ update: '', delete: '' });
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const getMovies = async () => {
		const movies = await fetchData('admin/movies');
		setMovies(movies);
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setEditedMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
	};

	const handleEdit = (movie) => {
		setEditedMovie({
			id: movie._id,
			title: movie.title,
			description: movie.description,
			genre: movie.genre,
			release_year: parseInt(movie.release_year),
			duration_time: parseInt(movie.duration_time),
			director: movie.director,
		});
	};

	const handleEditSave = () => {
		setError({ update: '', delete: '' });

		if (user) {
			if (!updateLoading) {
				updateData('admin/movies', editedMovie)
					.then(() => {
						setEditedMovie(null);
						getMovies();
					})
					.catch((err) =>
						setError((prevError) => ({ ...prevError, update: err.message }))
					);
			}
		} else {
			navigate('/');
		}
	};

	const handleDelete = (movieId) => {
		setError({ update: '', delete: '' });

		if (user) {
			if (!deleteLoading) {
				deleteData(`admin/movies/${movieId}`)
					.then(() => getMovies())
					.catch((err) =>
						setError((prevError) => ({ ...prevError, delete: err.message }))
					);
			}
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		if (!fetchLoading) {
			getMovies();
		}
	}, []);

	return (
		<div>
			{fetchError && <InlineError error={fetchError} />}
			{error.delete && <InlineError error={error.delete} />}
			{error.update && <InlineError error={error.update} />}
			{deleteMessage && <InlineMessage message={deleteMessage} />}
			{updateMessage && <InlineMessage message={updateMessage} />}
			{movies && (
				<div className='overflow-x-scroll'>
					<table>
						<thead>
							<tr>
								<th>Tytuł</th>
								<th>Opis</th>
								<th>Gatunek</th>
								<th>Rok wydania</th>
								<th>Czas trwania</th>
								<th>Reżyser</th>
							</tr>
						</thead>
						<tbody>
							{movies.map((movie) => (
								<tr key={movie._id}>
									{editedMovie && editedMovie.id === movie._id ? (
										<>
											<td>
												<input
													className='edit-input'
													type='text'
													id='title'
													name='title'
													value={editedMovie.title || ''}
													onChange={handleChange}
												/>
											</td>
											<td>
												<input
													className='edit-input'
													name='description'
													id='description'
													value={editedMovie.description || ''}
													onChange={handleChange}
												/>
											</td>
											<td>
												<input
													className='edit-input'
													type='text'
													id='genre'
													name='genre'
													value={editedMovie.genre || ''}
													onChange={handleChange}
												/>
											</td>
											<td>
												<input
													className='edit-input'
													type='text'
													id='release_year'
													name='release_year'
													value={editedMovie.release_year || ''}
													onChange={handleChange}
												/>
											</td>
											<td>
												<input
													className='edit-input'
													type='text'
													id='duration_time'
													name='duration_time'
													value={editedMovie.duration_time || ''}
													onChange={handleChange}
												/>
											</td>
											<td>
												<input
													className='edit-input'
													type='text'
													id='director'
													name='director'
													value={editedMovie.director || ''}
													onChange={handleChange}
												/>
											</td>
										</>
									) : (
										<>
											<td>{movie.title}</td>
											<td>{movie.description}</td>
											<td>{movie.genre}</td>
											<td>{movie.release_year}</td>
											<td>{movie.duration_time}</td>
											<td>{movie.director}</td>
										</>
									)}
									<td>
										{editedMovie && editedMovie.id === movie._id ? (
											<button onClick={handleEditSave} className='table-button'>
												<PiCheckBold />
												<span>Zapisz</span>
											</button>
										) : (
											<button
												onClick={() => handleEdit(movie)}
												className='table-button'
											>
												<PiNotePencilFill />
												<span>Edytuj</span>
											</button>
										)}
									</td>
									<td>
										<button
											onClick={() => handleDelete(movie._id)}
											className='table-button'
										>
											<PiTrashSimpleBold />
											<span>Usuń</span>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default AdminMoviesList;
