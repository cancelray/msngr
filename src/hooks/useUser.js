import { useEffect, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useUser = (messages, loginUserId) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [userContactListId, setUserContactListId] = useState([]);
	const [userContactList, setUserContactList] = useState([]);
	const [userChats, setUserChats] = useState([]);
	const [chatList, setChatList] = useState([]);
	const [isUserLoading, setIsUserLoading] = useState(true);

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

	const getUsersFromChatList = async (users, userChats) => {
		const usersFromChatList = [];

		userChats.forEach((chat, i) => {
			const user = structuredClone(
				users.find((user) => Number(user.id) === chat.membersId[1]),
			);

			user.chatId = userChats[i].id;
			usersFromChatList.push(user);
		});

		const chatsData = usersFromChatList.map(async (userChat) => {
			const messangesData = await chatsAPI.getMessagesByChatId(
				Number(userChat.chatId),
			);

			messangesData.sort((a, b) => a.createdAt - b.createdAt);

			userChat.lastMessage = messangesData.at(-1).content;
			userChat.lastMessageAuthor = messangesData.at(-1).senderId;
			userChat.lastMessageTime = messangesData.at(-1).createdAt;

			return { ...userChat, extra: messangesData };
		});

		const chatsResult = await Promise.all(chatsData);

		return chatsResult;
	};

	useEffect(() => {
		if (loginUserId) {
			usersAPI.getAllUsers().then(setUsers);
			usersAPI.getUser(loginUserId).then(setUser);
			usersAPI
				.getContactList(loginUserId)
				.then(setUserContactListId)
				.finally(() => setIsUserLoading(false));

			getChatList(loginUserId);
		}
	}, [loginUserId]);

	useEffect(() => {
		getContactList(userContactListId);
	}, [userContactListId]);

	useEffect(() => {
		getUsersFromChatList(users, userChats).then(setChatList);
	}, [users, userChats]);

	useEffect(() => {
		const lastMessage = messages.at(-1);

		const newChatList = structuredClone(chatList);

		newChatList.forEach((chat) => {
			if (Number(chat?.chatId) === lastMessage?.chatId) {
				chat.lastMessage = lastMessage.content;
				chat.lastMessageAuthor = lastMessage.senderId;
				chat.lastMessageTime = lastMessage.createdAt;

				setChatList(newChatList);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	return {
		user,
		userContactListId,
		userContactList,
		userChats,
		chatList,
		isUserLoading,
	};
};

export default useUser;
