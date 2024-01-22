const Pagination = ({ currentPage, totalPages, changePage }) => {
	return (
		<div className='w-full mt-6 flex justify-center gap-6'>
			{Array.from({ length: totalPages }, (_, page) => (
				<button
					key={page}
					className={`w-8 aspect-1 rounded-full ${
						currentPage === page + 1 ? 'bg-gray-dark' : 'bg-transparent'
					}`}
					onClick={() => changePage(page + 1)}
				>
					{page + 1}
				</button>
			))}
		</div>
	);
};

export default Pagination;
