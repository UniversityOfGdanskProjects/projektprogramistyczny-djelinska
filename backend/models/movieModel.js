const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
	},
});

const movieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		genres: [
			{
				type: String,
				ref: 'Genre',
			},
		],
		release_year: {
			type: Number,
			required: true,
		},
		duration_time: {
			type: Number,
			required: true,
		},
		director: {
			type: String,
			required: true,
		},
		actors: [
			{
				name: {
					type: String,
					required: true,
				},
				role: {
					type: String,
					required: true,
				},
				image: {
					type: String,
				},
			},
		],
		poster_image: { type: String },
		video_url: { type: String },
		images: [{ type: String }],
		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Review',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
