import { useEffect } from 'react';

import chatsAPI from '../../api/chatsAPI';
import usersAPI from '../../api/usersAPI';

import MainPageWrapper from '../MainPageWrapper/MainPageWrapper';
import LoginPageWrapper from '../login/LoginPageWrapper/LoginPageWrapper';

import { useSelector } from 'react-redux';
import useMessengerContext from '../../hooks/context/useMessengerContext';
import type { State } from '../../types/store/state.type';

const AppWrapper = () => {
	const { setUsers, setMessages } = useMessengerContext();

	const loginUserId = useSelector(
		(state: State) => state.loginUserId?.loginUserId,
	);

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
