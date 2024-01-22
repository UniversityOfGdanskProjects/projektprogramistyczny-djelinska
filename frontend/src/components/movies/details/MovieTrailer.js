const MovieTrailer = ({ videoUrl, title }) => {
	return (
		<div className='w-full'>
			<h3 className='text-xl font-semibold mb-4'>Zwiastun {title}</h3>
			<iframe
				className='w-full aspect-2'
				src={videoUrl}
				title={title}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
			></iframe>
		</div>
	);
};

export default MovieTrailer;
