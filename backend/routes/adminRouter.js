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
} = require('../controllers/adminController');

const router = express.Router();

// /api/admin
router.get('/users', requireToken, checkAdmin, getUsers);
router.delete('/users/:id', requireToken, checkAdmin, deleteUser);

router.get('/movies', requireToken, checkAdmin, getMovies);
router.post('/movies', requireToken, checkAdmin, addMovie);
router.patch('/movies', requireToken, checkAdmin, updateMovie);
router.delete('/movies/:id', requireToken, checkAdmin, deleteMovie);

router.get('/comments', requireToken, checkAdmin, getComments);

module.exports = router;
