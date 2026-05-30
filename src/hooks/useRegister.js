import { useCallback, useState } from 'react';

import usersAPI from '../api/usersAPI';

const useRegister = (setIsLoginPageShow) => {
	const [registerErrors, setRegisterErrors] = useState({
		isError: false,
		errorTarget: '',
		errorBody: '',
	});

	const registerSubmit = useCallback(
		async (
			newLogin,
			newPassword,
			newPasswordRepeat,
			newName,
			newSecondName,
			clearCallback,
		) => {
			const user = await usersAPI.getUserByLogin(newLogin);

			if (user.length > 0) {
				setRegisterErrors({
					isError: true,
					errorTarget: 'new-login',
					errorBody: 'Login already exists',
				});
				return;
			}

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

			clearCallback();

			setRegisterErrors({
				isError: false,
				errorTarget: '',
				errorBody: '',
			});

			setIsLoginPageShow(true);
		},
		[setIsLoginPageShow],
	);

	return {
		registerSubmit,
		registerErrors,
	};
};

export default useRegister;
