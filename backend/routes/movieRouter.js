const express = require('express');
const {
	importMovies,
	getMovies,
	getMovie,
	getMoviesGenres,
	getMoviesYears,
	addMovieRating,
	addMovieComment,
	getTopPopularMovies,
	getTopRatedMovies,
} = require('../controllers/movieController');
const {
	checkAdmin,
	requireToken,
	assignToken,
} = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/movies
router.get('/import', requireToken, checkAdmin, importMovies);
router.get('/', assignToken, getMovies);
router.get('/movie/:id', getMovie);
router.get('/genres', getMoviesGenres);
router.get('/years', getMoviesYears);

router.post('/rate/add', requireToken, addMovieRating);
router.post('/comment/add', requireToken, addMovieComment);

router.get('/top/popular', getTopPopularMovies);
router.get('/top/rated', getTopRatedMovies);

module.exports = router;
