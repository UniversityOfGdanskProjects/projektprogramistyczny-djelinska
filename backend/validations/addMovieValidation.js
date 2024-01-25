const { body } = require('express-validator');

const addMovieValidationRules = [
	body('title').isString().notEmpty().withMessage('Tytuł filmu jest wymagany'),

	body('description')
		.isString()
		.isLength({ max: 500 })
		.withMessage('Opis filmu jest za długi')
		.notEmpty()
		.withMessage('Opis filmu jest wymagany'),

	body('genre')
		.isString()
		.notEmpty()
		.withMessage('Gatunek filmu jest wymagany'),

	body('release_year')
		.isNumeric()
		.withMessage('Rok produkcji musi być liczbą')
		.isInt({ min: 1800 })
		.withMessage('Rok produkcji musi być równy lub większy niż 1800')
		.isInt({ max: new Date().getFullYear() })
		.withMessage('Rok produkcji nie może być większy niż bieżący rok')
		.notEmpty()
		.withMessage('Rok produkcji filmu jest wymagany'),

	body('duration_time')
		.isNumeric()
		.withMessage('Czas trwania musi być liczbą')
		.isInt({ min: 0 })
		.withMessage('Czas trwania filmu jest za krótki')
		.notEmpty()
		.withMessage('Czas trwania filmu jest wymagany'),

	body('director')
		.isString()
		.notEmpty()
		.withMessage('Reżyser filmu jest wymagany'),

	body('poster_image')
		.isString()
		.isURL()
		.withMessage('Nieprawidłowy adres url')
		.notEmpty()
		.withMessage('Adres url zdjęcia jest wymagany'),

	body('video_url').isString().isURL().withMessage('Nieprawidłowy adres url'),
];

module.exports = addMovieValidationRules;
