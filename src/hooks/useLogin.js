import { useState } from 'react';
import usersAPI from '../api/usersAPI';

const useLogin = () => {
	const [loginUserId, setLoginUserId] = useState(() => {
		const loginId = localStorage.getItem('LoginUserId');
		return loginId ? Number(loginId) : null;
	});
	const [loginInput, setLoginInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const loginSubmit = (event) => {
		event.preventDefault();
		usersAPI.getUserByLogin(loginInput).then((user) => {
			if (user[0].password === passwordInput) {
				setLoginUserId(Number(user[0].id));
				localStorage.setItem('LoginUserId', Number(user[0].id));
			}
		});
	};

	return {
		loginUserId,
		loginInput,
		setLoginInput,
		passwordInput,
		setPasswordInput,
		loginSubmit,
	};
};

export default useLogin;
