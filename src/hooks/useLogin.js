import { useCallback, useState } from 'react';

import usersAPI from '../api/usersAPI';

const useLogin = () => {
	const [loginUserId, setLoginUserId] = useState(() => {
		const loginId = localStorage.getItem('LoginUserId');
		return loginId ? loginId : null;
	});

	const [isLoginPageShow, setIsLoginPageShow] = useState(true);
	const [loginErrors, setLoginErrors] = useState({
		isError: false,
		errorTarget: '',
		errorBody: '',
	});

	const toRegisterPage = useCallback((callbackClear) => {
		setLoginErrors({
			isError: false,
			errorTarget: '',
			errorBody: '',
		});

		callbackClear();
		setIsLoginPageShow(false);
	}, []);

	const loginSubmit = useCallback(
		(loginInput, passwordInput, callbackClear) => {
			usersAPI.getUserByLogin(loginInput).then((user) => {
				if (user.length === 0) {
					setLoginErrors({
						isError: true,
						errorTarget: 'login-log',
						errorBody: 'User not found',
					});
					return;
				}

				if (user[0].password === passwordInput) {
					setLoginUserId(user[0].id);
					localStorage.setItem('LoginUserId', user[0].id);
				} else {
					setLoginErrors({
						isError: true,
						errorTarget: 'login-pass',
						errorBody: 'Incorrect password',
					});
					return;
				}

				setLoginErrors({
					isError: false,
					errorTarget: '',
					errorBody: '',
				});
				callbackClear();
			});
		},
		[],
	);

	return {
		loginUserId,
		setLoginUserId,
		loginSubmit,
		loginErrors,
		toRegisterPage,
		isLoginPageShow,
		setIsLoginPageShow,
	};
};

export default useLogin;
