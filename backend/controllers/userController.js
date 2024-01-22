const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/authMiddleware');
const { default: mongoose } = require('mongoose');

const registerUser = async (req, res) => {
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

const updateUserAccount = async (req, res) => {
	try {
		const { username, currentPassword, newPassword } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
		}

		const updateFields = {};

		if (username) {
			updateFields.username = username;
		}

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

		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{ $set: updateFields },
			{ new: true }
		);

		res.status(200).json(updatedUser);
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

		res.status(200).json({ message: 'Użytkownik został usunięty' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getUserFavoriteMovies = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate('favorite_movies');

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

		res.status(200).json(user.favorite_movies);
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

module.exports = {
	registerUser,
	loginUser,
	updateUserAccount,
	deleteUserAccount,
	getUserFavoriteMovies,
	addFavoriteMovie,
	deleteFavoriteMovie,
	getUsers,
	deleteUser,
};
