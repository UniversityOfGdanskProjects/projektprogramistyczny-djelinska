const moviesData = require('../data/movies');
const Movie = require('../models/movieModel');

const importMovies = async (req, res) => {
	try {
		await Movie.deleteMany({});

		const moviesDataWithDefaults = moviesData.map((movie) => ({
			...movie,
			rate: 0,
			rating_count: 0,
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
		const movie = await Movie.findById(req.params.id);

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

module.exports = {
	importMovies,
	getMovies,
	getMovie,
	getMoviesGenres,
	getMoviesYears,
};
