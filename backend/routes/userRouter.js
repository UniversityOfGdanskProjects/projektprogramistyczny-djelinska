const express = require('express');
const {
	registerUser,
	loginUser,
	updateUserAccount,
	deleteUserAccount,
	getUserFavoriteMovies,
	addFavoriteMovie,
	deleteFavoriteMovie,
	getUsers,
	deleteUser,
} = require('../controllers/userController');
const { requireToken, checkAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// /api/users
router.post('/register', registerUser);
router.post('/login', loginUser);

router.patch('/', requireToken, updateUserAccount);
router.delete('/', requireToken, deleteUserAccount);

router.get('/favorites', requireToken, getUserFavoriteMovies);
router.patch('/favorites/add', requireToken, addFavoriteMovie);
router.patch('/favorites/delete', requireToken, deleteFavoriteMovie);

router.get('/', requireToken, checkAdmin, getUsers);
router.delete('/:id', requireToken, checkAdmin, deleteUser);

module.exports = router;
