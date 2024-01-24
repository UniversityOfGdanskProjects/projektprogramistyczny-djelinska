const express = require('express');
const {
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
} = require('../controllers/userController');
const { requireToken, checkAdmin } = require('../middlewares/authMiddleware');
const userRegisterValidationRules = require('../validations/userRegisterValidation');
const userLoginValidationRules = require('../validations/userLoginValidation');
const updateAccountValidationRules = require('../validations/updateAccountValidation');

const router = express.Router();

// /api/users
router.post('/register', userRegisterValidationRules, registerUser);
router.post('/login', userLoginValidationRules, loginUser);

router.get('/account', requireToken, getUser);
router.patch(
	'/account/update',
	requireToken,
	updateAccountValidationRules,
	updateUserAccount
);
router.delete('/account/delete', requireToken, deleteUserAccount);

router.get('/favorites', requireToken, getUserFavoriteMovies);
router.patch('/favorites/add', requireToken, addFavoriteMovie);
router.patch('/favorites/delete', requireToken, deleteFavoriteMovie);

router.get('/watchlist', requireToken, getUserWatchlistMovies);
router.patch('/watchlist/add', requireToken, addWatchlistMovie);
router.patch('/watchlist/delete', requireToken, deleteWatchlistMovie);

router.get('/ignored', requireToken, getUserIgnoredMovies);
router.patch('/ignored/add', requireToken, addIgnoredMovie);
router.patch('/ignored/delete', requireToken, deleteIgnoredMovie);

module.exports = router;
