import { PiXCircleFill } from 'react-icons/pi';

const InlineError = ({ error }) => {
	return (
		<div className='py-1 text-sm flex items-center gap-2'>
			<PiXCircleFill className='text-red-dark text-2xl' />
			<p>{error}</p>
		</div>
	);
};

export default InlineError;
