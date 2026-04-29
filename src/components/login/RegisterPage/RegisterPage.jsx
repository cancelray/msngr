import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import styles from './RegisterPage.module.css';

const RegisterPage = () => {
	const {
		newLogin,
		setNewLogin,
		newPassword,
		setNewPassword,
		newPasswordRepeat,
		setNewPasswordRepeat,
		newName,
		setNewName,
		newSecondName,
		setNewSecondName,
		registerSubmit,
		registerErrors,
	} = useContext(MessengerContext);

	return (
		<form
			className={styles.registerForm}
			onSubmit={registerSubmit}
		>
			<div>
				<label htmlFor='new-login'>Login:</label>
				<input
					id='new-login'
					type='text'
					autoComplete='new-login'
					value={newLogin}
					onChange={(event) => setNewLogin(event.target.value)}
				/>
				{registerErrors.isError &&
				registerErrors.errorTarget === 'new-login' ? (
					<span className={styles.error}>{registerErrors.errorBody}</span>
				) : null}
			</div>
			<div>
				<label htmlFor='new-password'>Password:</label>
				<input
					id='new-password'
					type='password'
					autoComplete='new-password'
					value={newPassword}
					onChange={(event) => setNewPassword(event.target.value)}
				/>
				{registerErrors.isError &&
				registerErrors.errorTarget === 'new-password' ? (
					<span className={styles.error}>{registerErrors.errorBody}</span>
				) : null}
			</div>
			<div>
				<label htmlFor='new-password-repeat'>Repeat Password:</label>
				<input
					id='new-password-repeat'
					type='password'
					autoComplete='new-password-repeat'
					value={newPasswordRepeat}
					onChange={(event) => setNewPasswordRepeat(event.target.value)}
				/>
				{registerErrors.isError &&
				registerErrors.errorTarget === 'new-password-repeat' ? (
					<span className={styles.error}>{registerErrors.errorBody}</span>
				) : null}
			</div>
			<div>
				<label htmlFor='new-name'>Name:</label>
				<input
					id='new-name'
					type='text'
					value={newName}
					onChange={(event) => setNewName(event.target.value)}
				/>
				{registerErrors.isError && registerErrors.errorTarget === 'new-name' ? (
					<span className={styles.error}>{registerErrors.errorBody}</span>
				) : null}
			</div>
			<div>
				<label htmlFor='new-second-name'>Second Name:</label>
				<input
					id='new-second-name'
					type='text'
					value={newSecondName}
					onChange={(event) => setNewSecondName(event.target.value)}
				/>
				<span className={styles.optional}>optional</span>
			</div>
			<button
				disabled={
					newLogin.trim().length === 0 ||
					newPassword.trim().length === 0 ||
					newPasswordRepeat.trim().length === 0 ||
					newName.trim().length === 0
				}
			>
				Sign up
			</button>
		</form>
	);
};

export default RegisterPage;
