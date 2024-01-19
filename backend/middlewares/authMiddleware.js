const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (id) => {
	return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

const requireToken = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: 'Wymagana autoryzacja' });
	}

	const token = authorization.split(' ')[1];

	try {
		const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);

		req.user = await User.findById(_id);

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: 'Nieudana autoryzacja' });
	}
};

const checkAdmin = async (req, res, next) => {
	if (req.user && req.user.is_admin) {
		next();
	} else {
		res.status(401).json({
			error: 'Brak dostępu. Użytkownik nie jest administratorem',
		});
	}
};

module.exports = { createToken, requireToken, checkAdmin };
