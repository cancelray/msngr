import { useContext } from 'react';

import { UIContext } from '../../../context/UIContext';

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import styles from './LoginPageWrapper.module.css';

const LoginPageWrapper = () => {
	const { isLoginPageShow } = useContext(UIContext);

	return (
		<div className={styles.loginPageWrapper}>
			{isLoginPageShow ? <LoginPage /> : <RegisterPage />}
		</div>
	);
};

export default LoginPageWrapper;
