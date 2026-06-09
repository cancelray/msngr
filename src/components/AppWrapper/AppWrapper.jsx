import { useContext, useEffect } from 'react';

import chatsAPI from '../../api/chatsAPI';
import usersAPI from '../../api/usersAPI';

import MainPageWrapper from '../MainPageWrapper/MainPageWrapper';
import LoginPageWrapper from '../login/LoginPageWrapper/LoginPageWrapper';

import { AuthContext } from '../../context/AuthContext';
import { MessengerContext } from '../../context/MessengerContext';

const AppWrapper = () => {
	const { setUsers, setMessages } = useContext(MessengerContext);
	const { loginUserId } = useContext(AuthContext);

	useEffect(() => {
		usersAPI.getAllUsers().then(setUsers);
		chatsAPI.getAllMessages().then(setMessages);
	}, [setUsers, setMessages]);

	return loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />;
};

export default AppWrapper;
