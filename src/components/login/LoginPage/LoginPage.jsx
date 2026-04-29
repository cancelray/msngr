import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import styles from './LoginPage.module.css';

const LoginPage = () => {
	const {
		loginInput,
		setLoginInput,
		passwordInput,
		setPasswordInput,
		loginSubmit,
		loginErrors,
		toRegisterPage,
	} = useContext(MessengerContext);

	return (
		<form
			className={styles.loginForm}
			onSubmit={loginSubmit}
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
				<button
					disabled={
						loginInput.trim().length === 0 || passwordInput.trim().length === 0
					}
				>
					Log in
				</button>
				<a onClick={toRegisterPage}>Sign up</a>
			</div>
		</form>
	);
};

export default LoginPage;
