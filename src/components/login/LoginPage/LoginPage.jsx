import { useContext, useState } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import Button from '../../UI/Button/Button';

import styles from './LoginPage.module.css';

const LoginPage = () => {
	const [loginInput, setLoginInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const { loginSubmit, loginErrors, toRegisterPage } =
		useContext(MessengerContext);

	const inputsClear = () => {
		setLoginInput('');
		setPasswordInput('');
	};

	const onSubmit = (event) => {
		event.preventDefault();
		loginSubmit(loginInput, passwordInput, inputsClear);
	};

	const onClick = (event) => {
		event.preventDefault();
		toRegisterPage(inputsClear);
	};

	return (
		<form
			className={styles.loginForm}
			onSubmit={onSubmit}
		>
			<div>
				<label htmlFor='login-log'>Login:</label>
				<input
					id='login-log'
					type='text'
					value={loginInput}
					onChange={(event) => setLoginInput(event.target.value)}
				/>
				{loginErrors.isError && loginErrors.errorTarget === 'login-log' ? (
					<span className={styles.error}>{loginErrors.errorBody}</span>
				) : null}
			</div>
			<div>
				<label htmlFor='login-pass'>Password:</label>
				<input
					id='login-pass'
					type='password'
					autoComplete='password'
					value={passwordInput}
					onChange={(event) => setPasswordInput(event.target.value)}
				/>
				{loginErrors.isError && loginErrors.errorTarget === 'login-pass' ? (
					<span className={styles.error}>{loginErrors.errorBody}</span>
				) : null}
			</div>
			<div className={styles.buttonWrapper}>
				<Button
					disabled={
						loginInput.trim().length === 0 || passwordInput.trim().length === 0
					}
				>
					Log in
				</Button>
				<a onClick={onClick}>Sign up</a>
			</div>
		</form>
	);
};

export default LoginPage;
