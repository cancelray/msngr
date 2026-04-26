import { useContext } from 'react';
import { MessengerContext } from '../../context/MessengerContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
	const {
		loginInput,
		setLoginInput,
		passwordInput,
		setPasswordInput,
		loginSubmit,
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
			</div>
			<div>
				<label htmlFor='login-pass'>Password:</label>
				<input
					id='login-pass'
					type='password'
					value={passwordInput}
					onChange={(event) => setPasswordInput(event.target.value)}
				/>
			</div>
			<button>Log in</button>
		</form>
	);
};

export default LoginPage;
