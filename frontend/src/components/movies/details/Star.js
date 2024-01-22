import { PiStarFill } from 'react-icons/pi';

const Star = ({ selected, handleRate }) => {
	return (
		<div
			className={`cursor-pointer ${
				selected ? 'rating-star-checked' : 'rating-star-not-checked'
			}`}
			onClick={handleRate}
		>
			<PiStarFill />
		</div>
	);
};

export default Star;
