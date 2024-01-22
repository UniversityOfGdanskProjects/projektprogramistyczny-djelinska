const mongoose = require('mongoose');

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
		genre: {
			type: String,
			required: true,
		},
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
		comments: [
			{
				user_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				comment: {
					type: String,
					required: true,
				},
			},
		],
		ratings: [
			{
				user_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				rating: {
					type: Number,
					required: true,
					min: 1,
					max: 5,
				},
			},
		],
		rating_count: {
			type: Number,
			required: true,
			default: 0,
		},
		total_rating: {
			type: Number,
			required: true,
			default: 0,
		},
		rate: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
