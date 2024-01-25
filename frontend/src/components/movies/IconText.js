const IconText = ({ icon: IconComponent, label, size }) => {
	const iconSize = size === 'small' ? '16px' : '20px';

	return (
		<div className='flex items-center gap-2'>
			{IconComponent && <IconComponent style={{ fontSize: iconSize }} />}
			<span className={`${size === 'small' ? 'text-sm' : 'text-base'}`}>
				{label}
			</span>
		</div>
	);
};

export default IconText;
