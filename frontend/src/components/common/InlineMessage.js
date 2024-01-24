import { PiChatTeardropDotsFill } from 'react-icons/pi';

const InlineMessage = ({ message }) => {
	return (
		<div className='py-1 text-sm flex items-center gap-2'>
			<PiChatTeardropDotsFill className='text-green text-2xl' />
			<p>{message}</p>
		</div>
	);
};

export default InlineMessage;
