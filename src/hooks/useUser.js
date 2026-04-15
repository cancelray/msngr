import { useEffect, useState } from 'react';

import usersAPI from '../api/usersAPI';

const useUser = () => {
	const [user, setUser] = useState({});
	const [userContactListId, setUserContactListId] = useState([]);
	const [userContactList, setUserContactList] = useState([]);
	const [userChats, setUserChats] = useState([]);

	const getContactList = (contactListId) => {
		return Promise.all(
			contactListId?.map((contact) => usersAPI.getUser(contact.contactId)),
		).then(setUserContactList);
	};

	const getChatList = (userId) => {	
		usersAPI.getAllChats().then((chats) => {
			const filteredChats = chats.filter((chat) => {
				return chat.membersId.includes(Number(userId));
			});
			setUserChats(filteredChats);
		});
	};

	useEffect(() => {
		usersAPI.getUser(localStorage.getItem('loginUserId')).then(setUser);
		usersAPI
			.getContactList(localStorage.getItem('loginUserId'))
			.then(setUserContactListId);

		getChatList(localStorage.getItem('loginUserId'));
	}, []);

	useEffect(() => {
		getContactList(userContactListId);
	}, [userContactListId]);

	return {
		user,
		getContactList,
		userContactListId,
		userContactList,
		userChats,
	};
};

export default useUser;
