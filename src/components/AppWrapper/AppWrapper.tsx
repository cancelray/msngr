import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import chatsAPI from '../../api/chatsAPI';
import usersAPI from '../../api/usersAPI';

import MainPageWrapper from '../MainPageWrapper/MainPageWrapper';
import LoginPageWrapper from '../login/LoginPageWrapper/LoginPageWrapper';

import { selectLoginUserId } from '../../store/auth/loginUserId.slice';
import { setMessages } from '../../store/chat/messages.slice';
import { setUsers } from '../../store/users/users.slice';

const AppWrapper = () => {
	const dispatch = useDispatch();

	const loginUserId = useSelector(selectLoginUserId);

	useEffect(() => {
		usersAPI.getAllUsers().then((resp) => dispatch(setUsers(resp)));

		chatsAPI.getAllMessages().then((resp) => dispatch(setMessages(resp)));
	}, [dispatch]);

	return loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />;
};

export default AppWrapper;
