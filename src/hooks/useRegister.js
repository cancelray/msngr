import { useState } from 'react';

import usersAPI from '../api/usersAPI';

const useRegister = (setIsLoginPageShow) => {
	const [newLogin, setNewLogin] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
	const [newName, setNewName] = useState('');
	const [newSecondName, setNewSecondName] = useState('');
	const [registerErrors, setRegisterErrors] = useState({
		isError: false,
		errorTarget: '',
		errorBody: '',
	});

	const registerSubmit = (event) => {
		event.preventDefault();

		usersAPI.getUserByLogin(newLogin).then((user) => {
			if (user.length > 0) {
				setRegisterErrors({
					isError: true,
					errorTarget: 'new-login',
					errorBody: 'Login already exists',
				});
				return;
			}
		});

		if (newLogin.length < 3) {
			setRegisterErrors({
				isError: true,
				errorTarget: 'new-login',
				errorBody: 'Min 3 symbols',
			});
			return;
		}

		if (newPassword.length < 7) {
			setRegisterErrors({
				isError: true,
				errorTarget: 'new-password',
				errorBody: 'Min 7 symbols',
			});
			return;
		}

		if (newPassword !== newPasswordRepeat) {
			setRegisterErrors({
				isError: true,
				errorTarget: 'new-password-repeat',
				errorBody: "Passwords don't match",
			});
			return;
		}

		const newUser = {
			name: newName,
			lastName: newSecondName,
			login: newLogin,
			password: newPassword,
			avatar: '',
		};

		usersAPI.addNewUser(newUser);

		setNewLogin('');
		setNewPassword('');
		setNewPasswordRepeat('');
		setNewName('');
		setNewSecondName('');

		setRegisterErrors({
			isError: false,
			errorTarget: '',
			errorBody: '',
		});

		setIsLoginPageShow(true);
	};

	return {
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
	};
};

export default useRegister;
