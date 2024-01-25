const { body } = require('express-validator');

const updateAccountValidationRules = [
	body('currentPassword')
		.isString()
		.notEmpty()
		.withMessage('Obecne hasło jest wymagane'),

	body('newPassword')
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
		.withMessage('Nowe hasło jest wymagane'),
];

module.exports = updateAccountValidationRules;
