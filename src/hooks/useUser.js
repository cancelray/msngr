import { useEffect, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useUser = () => {
	const [users, setUsers] = useState([]);
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
			const filteredChats = chats.filter((chat) =>
				chat.membersId.includes(Number(userId)),
			);

			filteredChats.forEach((chat) => {
				const userIndex = chat.membersId.indexOf(Number(userId));

				if (userIndex !== 0) {
					const [item] = chat.membersId.splice(userIndex, 1);
					chat.membersId.unshift(item);
				}
			});

			setUserChats(filteredChats);
		});
	};

	const getUsersFromChatList = (users, chatList) => {
		const usersFromChatList = [];

		chatList.forEach((chat, i) => {
			const user = users.find((user) => Number(user.id) === chat.membersId[1]);
			user.chatId = chatList[i].id;

			usersFromChatList.push(user);
		});

		usersFromChatList.map((userChat) => {
			chatsAPI
				.getMessangersByChatId(Number(userChat.chatId))
				.then((messangers) => {
					messangers.sort((a, b) => a.createdAt - b.createdAt);

					userChat.lastMessage = messangers.at(-1).content;
					userChat.lastMessageAuthor = messangers.at(-1).senderId;
					userChat.lastMessageTime = messangers.at(-1).createdAt;
				});
		});

		return usersFromChatList;
	};

	useEffect(() => {
		usersAPI.getAllUsers().then(setUsers);
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
		users,
		user,
		getContactList,
		userContactListId,
		userContactList,
		userChats,
		getUsersFromChatList,
	};
};

export default useUser;
