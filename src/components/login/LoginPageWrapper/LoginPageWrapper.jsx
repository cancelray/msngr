import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import styles from './LoginPageWrapper.module.css';

const LoginPageWrapper = () => {
	const { isLoginPageShow } = useContext(MessengerContext);

	return (
		<div className={styles.loginPageWrapper}>
			{isLoginPageShow ? <LoginPage /> : <RegisterPage />}
		</div>
	);
};

export default LoginPageWrapper;
