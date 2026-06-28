import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import useUIContext from '../../../hooks/context/useUIContext';

import styles from './LoginPageWrapper.module.css';

const LoginPageWrapper = () => {
	const { isLoginPageShow } = useUIContext();

	return (
		<div className={styles.loginPageWrapper}>
			{isLoginPageShow ? <LoginPage /> : <RegisterPage />}
		</div>
	);
};

export default LoginPageWrapper;
