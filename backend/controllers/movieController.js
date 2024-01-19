const moviesData = require('../data/movies');
const Movie = require('../models/movieModel');

const importMovies = async (req, res) => {
	try {
		await Movie.deleteMany({});

		const movies = await Movie.insertMany(moviesData);

		res.status(201).json(movies);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getMovies = async (req, res) => {
	try {
		const { title, genre_id, year, rate, order_by, order } = req.query;
		const filterOptions = {};

		if (title) filterOptions.title = { $regex: title, $options: 'i' };
		if (genre_id) filterOptions.genres = { $in: [genre_id] };
		if (year) filterOptions.release_year = year;

		const orderOptions = {};

		if (order_by) {
			orderOptions[order_by] = order ? (order === 'asc' ? 1 : -1) : -1;
		}

		const page = parseInt(req.query.page) || 1;
		const pageLimit = 2;
		const moviesSkip = (page - 1) * pageLimit;
		const movies = await Movie.find(filterOptions)
			.sort(orderOptions)
			.skip(moviesSkip)
			.limit(pageLimit);

		const moviesCount = await Movie.countDocuments(filterOptions);
		const totalPages = Math.ceil(moviesCount / pageLimit);

		res.status(200).json({ movies, moviesCount, page, totalPages });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

const getMovie = async (req, res) => {
	try {
		const movie = Movie.findById(req.params.id);

		if (!movie) {
			res.status(404).json({ error: 'Nie znaleziono filmu' });
		}

		res.status(200).json(movie);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Coś poszło nie tak' });
	}
};

module.exports = { importMovies, getMovies, getMovie };
