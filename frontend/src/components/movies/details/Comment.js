const Comment = ({ username, body }) => {
	return (
		<div className='border border-gray-dark p-4 rounded-md'>
			<p className='font-medium'>
				{username} <span className='text-sm text-gray-light'>napisał/a</span>
			</p>
			<p>{body}</p>
		</div>
	);
};

export default Comment;
