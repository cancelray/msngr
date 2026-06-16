import { useEffect } from 'react';

import chatsAPI from '../../api/chatsAPI';
import usersAPI from '../../api/usersAPI';

import MainPageWrapper from '../MainPageWrapper/MainPageWrapper';
import LoginPageWrapper from '../login/LoginPageWrapper/LoginPageWrapper';

import useAuthContext from '../../hooks/context/useAuthContext';
import useMessengerContext from '../../hooks/context/useMessengerContext';

const AppWrapper = () => {
	const { setUsers, setMessages } = useMessengerContext();
	const { loginUserId } = useAuthContext();

	useEffect(() => {
		usersAPI
			.getAllUsers()
			.then(setUsers)
			.catch((err) => alert(err));
		chatsAPI
			.getAllMessages()
			.then(setMessages)
			.catch((err) => alert(err));
	}, [setUsers, setMessages]);

	return loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />;
};

export default AppWrapper;
