const express = require('express');
const { registerUser } = require('../controllers/userController');
const { requireToken, checkAdmin } = require('../middlewares/authMiddleware');
const {
	getUsers,
	deleteUser,
	getMovies,
	getComments,
	addMovie,
	updateMovie,
	deleteMovie,
	deleteComment,
} = require('../controllers/adminController');
const addMovieValidationRules = require('../validations/addMovieValidation');
const updateMovieValidationRules = require('../validations/updateMovieValidation');

const router = express.Router();

// /api/admin
router.get('/users', requireToken, checkAdmin, getUsers);
router.delete('/users/:id', requireToken, checkAdmin, deleteUser);

router.get('/movies', requireToken, checkAdmin, getMovies);
router.post(
	'/movies',
	requireToken,
	checkAdmin,
	addMovieValidationRules,
	addMovie
);
router.patch(
	'/movies',
	requireToken,
	checkAdmin,
	updateMovieValidationRules,
	updateMovie
);
router.delete('/movies/:id', requireToken, checkAdmin, deleteMovie);

router.get('/comments', requireToken, checkAdmin, getComments);
router.patch('/comments', requireToken, checkAdmin, deleteComment);

module.exports = router;
