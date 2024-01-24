const { body } = require('express-validator');

const userLoginValidationRules = [
	body('username')
		.isString()
		.notEmpty()
		.withMessage('Nazwa użytkownika jest wymagana'),

	body('password').isString().notEmpty().withMessage('Hasło jest wymagane'),
];

module.exports = userLoginValidationRules;
