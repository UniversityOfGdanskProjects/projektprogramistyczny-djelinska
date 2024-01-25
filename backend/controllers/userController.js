const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/authMiddleware');
const { default: mongoose } = require('mongoose');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array()[0].msg });
	}

	try {
		const { username, email, password } = req.body;
		const userExists = await User.findOne({ username });

		if (userExists) {
			return res.status(400).json({ error: 'Użytkownik już istnieje' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		const token = createToken(user._id);

		res.status(201).json({ username, is_user: !user.is_admin, token });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const loginUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array()[0].msg });
	}

	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ error: 'Niepoprawne dane logowania' });
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);

		if (!passwordsMatch) {
			return res.status(401).json({ error: 'Niepoprawne dane logowania' });
		}

		const token = createToken(user._id);

		res.status(200).json({ username, is_user: !user.is_admin, token });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const updateUserAccount = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array()[0].msg });
	}

	try {
		const { currentPassword, newPassword } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		const updateFields = {};

		if (currentPassword && newPassword) {
			const passwordsMatch = await bcrypt.compare(
				currentPassword,
				user.password
			);

			if (!passwordsMatch) {
				return res.status(400).json({ error: 'Nieprawidłowe obecne hasło' });
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(newPassword, salt);

			updateFields.password = hashedPassword;
		}

		await User.findByIdAndUpdate(req.user._id, {
			$set: updateFields,
		});

		res.status(200).json({ message: 'Hasło zostało zmienione' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteUserAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (user.is_admin) {
			return res
				.status(400)
				.json({ error: 'Brak możliwości usunięcia użytkownika' });
		}

		await User.findByIdAndDelete(req.user._id);

		res.status(200).json({ message: 'Konto zostało usunięte' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getUserFavoriteMovies = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate(
			'favorite_movies',
			'poster_image title duration_time release_year genre'
		);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		res.status(200).json(user.favorite_movies);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const addFavoriteMovie = async (req, res) => {
	try {
		const { movie_id } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (!mongoose.isValidObjectId(movie_id)) {
			return res
				.status(400)
				.json({ error: 'Nieprawidłowy identyfikator filmu' });
		}

		const movieExists = await Movie.findOne({ _id: movie_id });

		if (!movieExists) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		const isMovieAdded = await User.find({
			_id: req.user._id,
			favorite_movies: { $in: [movie_id] },
		});

		if (isMovieAdded.length > 0) {
			return res
				.status(400)
				.json({ error: 'Film znajduje się już na liście ulubionych' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: { favorite_movies: movie_id },
		});

		res.status(200).json({ message: 'Dodano film do ulubionych' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteFavoriteMovie = async (req, res) => {
	try {
		const { movie_id } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (!mongoose.isValidObjectId(movie_id)) {
			return res
				.status(400)
				.json({ error: 'Nieprawidłowy identyfikator filmu' });
		}

		const movieExists = await Movie.findOne({ _id: movie_id });

		if (!movieExists) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$pull: { favorite_movies: movie_id },
		});

		res
			.status(200)
			.json({ message: 'Film został usunięty z listy ulubionych' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getUserWatchlistMovies = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate(
			'watchlist_movies',
			'poster_image title duration_time release_year genre'
		);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		res.status(200).json(user.watchlist_movies);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const addWatchlistMovie = async (req, res) => {
	try {
		const { movie_id } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (!mongoose.isValidObjectId(movie_id)) {
			return res
				.status(400)
				.json({ error: 'Nieprawidłowy identyfikator filmu' });
		}

		const movieExists = await Movie.findOne({ _id: movie_id });

		if (!movieExists) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		const isMovieAdded = await User.find({
			_id: req.user._id,
			watchlist_movies: { $in: [movie_id] },
		});

		if (isMovieAdded.length > 0) {
			return res
				.status(400)
				.json({ error: 'Film znajduje się już na liście do obejrzenia' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: { watchlist_movies: movie_id },
		});

		res.status(200).json({ message: 'Zapisano film na liście do obejrzenia' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteWatchlistMovie = async (req, res) => {
	try {
		const { movie_id } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (!mongoose.isValidObjectId(movie_id)) {
			return res
				.status(400)
				.json({ error: 'Nieprawidłowy identyfikator filmu' });
		}

		const movieExists = await Movie.findOne({ _id: movie_id });

		if (!movieExists) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$pull: { watchlist_movies: movie_id },
		});

		res
			.status(200)
			.json({ message: 'Film został usunięty z listy do obejrzenia' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getUserIgnoredMovies = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate(
			'ignored_movies',
			'title genre'
		);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		res.status(200).json(user.ignored_movies);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const addIgnoredMovie = async (req, res) => {
	try {
		const { movie_id } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (!mongoose.isValidObjectId(movie_id)) {
			return res
				.status(400)
				.json({ error: 'Nieprawidłowy identyfikator filmu' });
		}

		const movieExists = await Movie.findOne({ _id: movie_id });

		if (!movieExists) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		const isMovieAdded = await User.find({
			_id: req.user._id,
			ignored_movies: { $in: [movie_id] },
		});

		if (isMovieAdded.length > 0) {
			return res
				.status(400)
				.json({ error: 'Film znajduje się już na liście ignorowanych' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: { ignored_movies: movie_id },
		});

		res.status(200).json({ message: 'Zapisano film na liście ignorowanych' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const deleteIgnoredMovie = async (req, res) => {
	try {
		const { movie_id } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		if (!mongoose.isValidObjectId(movie_id)) {
			return res
				.status(400)
				.json({ error: 'Nieprawidłowy identyfikator filmu' });
		}

		const movieExists = await Movie.findOne({ _id: movie_id });

		if (!movieExists) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$pull: { ignored_movies: movie_id },
		});

		res
			.status(200)
			.json({ message: 'Film został usunięty z listy ignorowanych' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getTopUsers = async (req, res) => {
	try {
		const topUsers = await Movie.aggregate([
			{
				$project: {
					combinedData: {
						$concatArrays: ['$ratings', '$comments'],
					},
				},
			},
			{ $unwind: '$combinedData' },
			{
				$group: {
					_id: '$combinedData.user_id',
					totalInteractions: { $sum: 1 },
				},
			},
			{ $sort: { totalInteractions: -1 } },
			{ $limit: 5 },
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: '_id',
					as: 'userData',
				},
			},
			{
				$unwind: '$userData',
			},
			{
				$project: {
					username: '$userData.username',
					totalInteractions: 1,
				},
			},
		]);

		res.status(200).json(topUsers);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

module.exports = {
	registerUser,
	loginUser,
	getUser,
	updateUserAccount,
	deleteUserAccount,
	getUserFavoriteMovies,
	addFavoriteMovie,
	deleteFavoriteMovie,
	getUserWatchlistMovies,
	addWatchlistMovie,
	deleteWatchlistMovie,
	getUserIgnoredMovies,
	addIgnoredMovie,
	deleteIgnoredMovie,
	getTopUsers,
};
