import { useContext, useState } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { UIContext } from '../../../context/UIContext';

import Button from '../../UI/Button/Button';

import styles from './RegisterPage.module.css';

const RegisterPage = () => {
	const [newLogin, setNewLogin] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
	const [newName, setNewName] = useState('');
	const [newSecondName, setNewSecondName] = useState('');

	const { registerSubmit, registerErrors } = useContext(AuthContext);
	const { setIsLoginPageShow } = useContext(UIContext);

	const inputClear = () => {
		setNewLogin('');
		setNewPassword('');
		setNewPasswordRepeat('');
		setNewName('');
		setNewSecondName('');
	};

	const onSubmit = (event) => {
		event.preventDefault();

		registerSubmit(
			newLogin,
			newPassword,
			newPasswordRepeat,
			newName,
			newSecondName,
			inputClear,
		);
	};

	const backClickHandler = (event) => {
		event.preventDefault();

		setNewLogin('');
		setNewPassword('');
		setNewPasswordRepeat('');
		setNewName('');
		setNewSecondName('');

		setIsLoginPageShow(true);
	};

	return (
		<form
			className={styles.registerForm}
			onSubmit={onSubmit}
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
					autoComplete='new- password'
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
			<div className={styles.buttonWrapper}>
				<Button
					disabled={
						newLogin.trim().length === 0 ||
						newPassword.trim().length === 0 ||
						newPasswordRepeat.trim().length === 0 ||
						newName.trim().length === 0
					}
				>
					Sign up
				</Button>
				<a onClick={backClickHandler}>Back</a>
			</div>
		</form>
	);
};

export default RegisterPage;
