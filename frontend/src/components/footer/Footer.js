const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div className='absolute bottom-0 text-white text-sm border-t border-gray-dark w-full p-6 text-center'>
			&copy; Dominika Jelińska, {currentYear}
		</div>
	);
};

export default Footer;
