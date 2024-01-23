const { default: mongoose } = require('mongoose');
const moviesData = require('../data/movies');
const Movie = require('../models/movieModel');
const User = require('../models/userModel');

const importMovies = async (req, res) => {
	try {
		await Movie.deleteMany({});

		const moviesDataWithDefaults = moviesData.map((movie) => ({
			...movie,
			rating_count: 0,
			total_rating: 0,
			rate: 0,
		}));
		const movies = await Movie.insertMany(moviesDataWithDefaults);

		res.status(201).json(movies);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getMovies = async (req, res) => {
	try {
		const { query, genre, year, rate, order_by, order } = req.query;
		const filterOptions = {};
		let userIgnoredMovies;

		if (req.user) {
			const user = await User.findById(req.user._id);
			userIgnoredMovies = user.ignored_movies;
		}

		if (query) {
			filterOptions.$or = [
				{ title: { $regex: query, $options: 'i' } },
				{ genre: { $regex: query, $options: 'i' } },
				{ director: { $regex: query, $options: 'i' } },
				{ 'actors.name': { $regex: query, $options: 'i' } },
			];
		}
		if (genre) filterOptions.genre = { $regex: genre, $options: 'i' };
		if (year) filterOptions.release_year = year;
		if (rate && rate >= 1 && rate <= 5) {
			const rateFrom = parseInt(rate) - 1;
			const rateTo = parseInt(rate);
			filterOptions.rate = { $gte: rateFrom, $lte: rateTo };
		}

		const orderOptions = {};

		if (order_by) {
			orderOptions[order_by] = order ? (order === 'asc' ? 1 : -1) : -1;
		}

		const page = parseInt(req.query.page) || 1;
		const pageLimit = 2;
		const moviesSkip = (page - 1) * pageLimit;
		const movies = await Movie.find({
			...filterOptions,
			_id: { $nin: userIgnoredMovies },
		})
			.sort({ ...orderOptions, _id: 1 })
			.skip(moviesSkip)
			.limit(pageLimit);

		const moviesCount = await Movie.countDocuments({
			...filterOptions,
			_id: { $nin: userIgnoredMovies },
		});
		const totalPages = Math.ceil(moviesCount / pageLimit);

		res.status(200).json({ movies, moviesCount, page, totalPages });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id).populate(
			'comments.user_id',
			'username'
		);

		if (!movie) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		res.status(200).json(movie);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getMoviesGenres = async (req, res) => {
	try {
		const genres = await Movie.aggregate([
			{
				$group: {
					_id: '$genre',
				},
			},
			{
				$sort: { _id: -1 },
			},
		]);

		res.status(200).json(genres);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getMoviesYears = async (req, res) => {
	try {
		const years = await Movie.aggregate([
			{
				$group: {
					_id: '$release_year',
				},
			},
			{
				$sort: { _id: -1 },
			},
		]);

		res.status(200).json(years);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const addMovieRating = async (req, res) => {
	try {
		const { movie_id, rate } = req.body;
		const movie = await Movie.findById(movie_id);

		if (!movie) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		const isMovieRated = await Movie.find({
			_id: movie_id,
			'ratings.user_id': { $in: [req.user._id] },
		});

		if (isMovieRated.length > 0) {
			return res.status(400).json({ error: 'Film został już oceniony' });
		}

		if (!rate || parseInt(rate) < 1 || parseInt(rate) > 5) {
			return res.status(400).json({ error: 'Nieprawidłowa ocena' });
		}

		await Movie.findByIdAndUpdate(movie_id, {
			$push: {
				ratings: {
					user_id: req.user._id,
					rating: parseInt(rate),
				},
			},
			$inc: { rating_count: 1, total_rating: parseInt(rate) },
		});

		const updatedMovie = await Movie.findById(movie_id);

		const newRate =
			updatedMovie.rating_count > 0
				? updatedMovie.total_rating / updatedMovie.rating_count
				: 0;

		await Movie.findByIdAndUpdate(movie_id, {
			$set: { rate: newRate },
		});

		res.status(201).json({ message: 'Dodano ocenę filmu' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const addMovieComment = async (req, res) => {
	try {
		const { movie_id, comment } = req.body;
		const movie = await Movie.findById(movie_id);

		if (!movie) {
			return res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		if (!comment) {
			return res.status(400).json({ error: 'Komentarz jest wymagany' });
		}

		await Movie.findByIdAndUpdate(movie_id, {
			$push: {
				comments: {
					user_id: req.user._id,
					comment: comment,
				},
			},
		});

		res.status(201).json({ message: 'Komentarz został dodany' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

module.exports = {
	importMovies,
	getMovies,
	getMovie,
	getMoviesGenres,
	getMoviesYears,
	addMovieRating,
	addMovieComment,
};
