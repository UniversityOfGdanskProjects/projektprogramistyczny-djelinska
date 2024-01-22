const Comment = ({ username, body }) => {
	return (
		<div className='border border-gray-dark p-4 rounded-md'>
			<h4 className='font-medium'>
				{username} <span className='text-sm text-gray-light'>napisał/a</span>
			</h4>
			<p>{body}</p>
		</div>
	);
};

export default Comment;
