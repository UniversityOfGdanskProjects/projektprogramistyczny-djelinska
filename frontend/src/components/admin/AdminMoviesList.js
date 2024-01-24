import {
	PiCheckBold,
	PiNotePencilFill,
	PiTrashSimpleBold,
	PiTrashSimpleFill,
} from 'react-icons/pi';
import { useEffect, useState } from 'react';

import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useUpdate from '../../hooks/useUpdate';

const AdminMoviesList = () => {
	const [movies, setMovies] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const [editedMovie, setEditedMovie] = useState(null);
	const initial = {
		title: '',
		description: '',
		genre: '',
		release_year: '',
		duration_time: '',
		director: '',
	};
	const { deleteData } = useDelete();
	const { updateData } = useUpdate();

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

	const handleEditSave = async () => {
		await updateData('admin/movies', editedMovie);
		setEditedMovie(null);
		getMovies();
	};

	const handleDelete = async (movieId) => {
		await deleteData(`admin/movies/${movieId}`);
		getMovies();
	};

	useEffect(() => {
		if (!isLoading) {
			getMovies();
		}
	}, []);

	return (
		<div>
			{error && <div>{error}</div>}
			{movies && (
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
			)}
		</div>
	);
};

export default AdminMoviesList;
