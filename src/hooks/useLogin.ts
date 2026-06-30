import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import usersAPI from '../api/usersAPI';
import { setLoginUserId } from '../store/auth/loginUserId.slice';

const useLogin = () => {
	const dispatch = useDispatch();

	const [isLoginPageShow, setIsLoginPageShow] = useState(true);
	const [loginErrors, setLoginErrors] = useState({
		isError: false,
		errorTarget: '',
		errorBody: '',
	});

	const toRegisterPage = useCallback((callbackClear: () => void) => {
		setLoginErrors({
			isError: false,
			errorTarget: '',
			errorBody: '',
		});

		callbackClear();
		setIsLoginPageShow(false);
	}, []);

	const loginSubmit = useCallback(
		(loginInput: string, passwordInput: string, callbackClear: () => void) => {
			usersAPI
				.getUserByLogin(loginInput)
				.then((user) => {
					if (user.length === 0) {
						setLoginErrors({
							isError: true,
							errorTarget: 'login-log',
							errorBody: 'User not found',
						});
						return;
					}

					if (user[0].password === passwordInput) {
						dispatch(setLoginUserId(user[0].id));
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
		[dispatch],
	);

	return {
		setLoginUserId,
		loginSubmit,
		loginErrors,
		toRegisterPage,
		isLoginPageShow,
		setIsLoginPageShow,
	};
};

export default useLogin;
