import type { ButtonProps } from '../../../types/props/ButtonProps.type';
import styles from './Button.module.css';

const Button = (props: ButtonProps) => {
	const { onClick, disabled, children } = props;

	return (
		<button
			onClick={onClick}
			className={styles.button}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
