const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		is_admin: {
			type: Boolean,
			default: false,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		favorite_movies: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Movie',
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
