const ActorCard = ({ actor }) => {
	return (
		<div>
			<div className='w-full aspect-1 bg-black-light rounded-md overflow-hidden'>
				<img
					src={actor.image}
					alt={actor.name}
					className='object-cover w-full h-full transition ease-in-out duration-300 hover:scale-105'
				/>
			</div>
			<div className='mt-4 text-center'>
				<h4>{actor.name}</h4>
				<p className='text-sm'>{actor.role}</p>
			</div>
		</div>
	);
};

export default ActorCard;
