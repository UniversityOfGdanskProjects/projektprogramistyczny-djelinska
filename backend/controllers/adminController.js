const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const { default: mongoose } = require('mongoose');

const getUsers = async (req, res) => {
	try {
		const users = await User.find({});

		res.status(200).json(users);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (user.is_admin) {
			return res
				.status(400)
				.json({ error: 'Brak możliwości usunięcia użytkownika' });
		}

		await User.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: 'Użytkownik został usunięty' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getMovies = async (req, res) => {
	try {
		const movies = await Movie.find({});

		res.status(200).json(movies);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteMovie = async (req, res) => {
	try {
		const movie = await User.findById(req.params.id);

		if (!movie) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		await Movie.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: 'Film został usunięty' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const addMovie = async (req, res) => {
	try {
		const newMovie = req.body;
		await Movie.create(newMovie);

		res.status(200).json({ message: 'Film został dodany' });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const updateMovie = async (req, res) => {
	try {
		const { newMovie } = req.query;
		const movie = await User.findById(movie_id);

		if (!movie) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		await Movie.findByIdAndUpdate(req.params.id, {
			...newMovie,
		});

		res.status(200).json({ message: 'Dane filmu zostały zmienione' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getComments = async (req, res) => {
	try {
		const movies = await Movie.find({});
		let allComments = [];

		movies.forEach((movie) => {
			if (movie.comments && movie.comments.length > 0) {
				allComments = allComments.concat(movie.comments);
			}
		});

		res.status(200).json(allComments);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

module.exports = {
	getUsers,
	deleteUser,
	getMovies,
	addMovie,
	updateMovie,
	deleteMovie,
	getComments,
};
