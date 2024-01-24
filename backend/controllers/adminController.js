const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const { default: mongoose } = require('mongoose');
const { validationResult } = require('express-validator');

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

const addMovie = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array()[0].msg });
	}

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
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array()[0].msg });
	}

	try {
		const {
			id,
			title,
			description,
			genre,
			release_year,
			duration_time,
			director,
		} = req.body;
		const movie = await Movie.findById(id);

		if (!movie) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		await Movie.findByIdAndUpdate(id, {
			title,
			description,
			genre,
			release_year,
			duration_time,
			director,
		});

		res.status(200).json({ message: 'Dane filmu zostały zmienione' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);

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

const getComments = async (req, res) => {
	try {
		const movies = await Movie.find({}).populate(
			'comments.user_id',
			'username'
		);

		let allComments = [];

		movies.forEach((movie) => {
			if (movie.comments && movie.comments.length > 0) {
				movie.comments.forEach((comment) => {
					allComments.push({
						id: comment._id,
						movieTitle: movie.title,
						username: comment.user_id.username,
						comment: comment.comment,
					});
				});
			}
		});

		res.status(200).json(allComments);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteComment = async (req, res) => {
	try {
		const { commentId } = req.body;

		await Movie.updateOne(
			{ 'comments._id': commentId },
			{ $pull: { comments: { _id: commentId } } }
		);

		res.status(200).json({ message: 'Komentarz został usunięty' });
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
	deleteComment,
};
