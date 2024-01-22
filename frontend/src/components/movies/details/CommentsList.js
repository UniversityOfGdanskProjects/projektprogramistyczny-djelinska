import Comment from './Comment';

const CommentsList = ({ comments }) => {
	return (
		<div>
			<h3 className='w-full text-xl font-semibold mb-4'>Lista komentarzy</h3>
			<div className='flex flex-col gap-2'>
				{comments.map((comment) => (
					<Comment username={comment.user_id.username} body={comment.comment} />
				))}
			</div>
		</div>
	);
};

export default CommentsList;
