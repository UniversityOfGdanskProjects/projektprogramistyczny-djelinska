const express = require('express');
const {
	importMovies,
	getMovies,
	getMovie,
	getMoviesGenres,
	getMoviesYears,
} = require('../controllers/movieController');
const { checkAdmin, requireToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/movies
router.get('/import', requireToken, checkAdmin, importMovies);
router.get('/', getMovies);
router.get('/movie/:id', getMovie);
router.get('/genres', getMoviesGenres);
router.get('/years', getMoviesYears);

module.exports = router;
