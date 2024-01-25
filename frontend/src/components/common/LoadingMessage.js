import { PiSpinnerGapBold } from 'react-icons/pi';

const LoadingMessage = ({ message }) => {
	return (
		<div className='py-1 text-sm flex items-center gap-2'>
			<PiSpinnerGapBold className='text-white text-2xl' />
			<p>{message}</p>
		</div>
	);
};

export default LoadingMessage;
