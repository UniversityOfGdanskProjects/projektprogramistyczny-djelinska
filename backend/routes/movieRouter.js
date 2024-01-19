const express = require('express');
const {
	importMovies,
	getMovies,
	getMovie,
} = require('../controllers/movieController');
const { checkAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/movies
router.get('/import', checkAdmin, importMovies);
router.get('/', getMovies);
router.get('/:id', getMovie);

module.exports = router;
