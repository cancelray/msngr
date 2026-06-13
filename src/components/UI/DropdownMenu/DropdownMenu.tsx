import styles from './DropdownMenu.module.css';

const DropdownMenu = (props) => {
	const { children, ref, className } = props;

	return (
		<div
			className={`${styles.dropdown} ${className}`}
			ref={ref}
		>
			{children}
		</div>
	);
};

export default DropdownMenu;
