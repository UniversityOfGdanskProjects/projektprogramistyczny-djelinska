const { body } = require('express-validator');

const userRegisterValidationRules = [
	body('username')
		.isString()
		.isLength({ min: 2, max: 20 })
		.withMessage('Nazwa użytkownika musi mieć od 2 do 20 znaków')
		.matches(/^[a-zA-Z0-9_]+$/)
		.withMessage(
			'Nazwa użytkownika może zawierać tylko litery, cyfry i znak podkreślenia'
		)
		.notEmpty()
		.withMessage('Nazwa użytkownika jest wymagana'),

	body('email')
		.isString()
		.isEmail()
		.withMessage('Nieprawidłowy adres e-mail')
		.notEmpty()
		.withMessage('Adres e-mail jest wymagany'),

	body('password')
		.isString()
		.isLength({ min: 8 })
		.withMessage('Hasło musi mieć minimum 8 znaków')
		.matches(/[A-Z]/)
		.withMessage('Hasło musi zawierać minimum jedną wielką literę')
		.matches(/\d/)
		.withMessage('Hasło musi zawierać minimum jedną cyfrę')
		.matches(/[!@#$%^&*(),.?":{}|<>]/)
		.withMessage('Hasło musi zawierać minimum jeden znak specjalny')
		.notEmpty()
		.withMessage('Hasło jest wymagane'),
];

module.exports = userRegisterValidationRules;
