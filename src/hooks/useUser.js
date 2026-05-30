import { useEffect, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import contactsAPI from '../api/contactsAPI';
import usersAPI from '../api/usersAPI';

const useUser = (
	messages,
	chatList,
	setChatList,
	loginUserId,
	setUserContactListId,
	newChatId,
	setNewChatId,
	isCurrentChatGroup,
) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [userChats, setUserChats] = useState([]);
	const [isUserLoading, setIsUserLoading] = useState(true);

	const getChatList = async (userId) => {
		chatsAPI.getAllChats().then((chats) => {
			const filteredChats = chats.filter((chat) =>
				chat.membersId.includes(userId),
			);

			filteredChats.forEach((chat) => {
				const userIndex = chat.membersId.indexOf(userId);

				if (userIndex !== 0) {
					const [item] = chat.membersId.splice(userIndex, 1);
					chat.membersId.unshift(item);
				}
			});

			setUserChats(filteredChats);
		});
	};

	const getUsersFromChatList = async (users, userChats) => {
		const allUserChats = [];

		userChats.forEach((chat, i) => {
			if (chat.isGroup) {
				const groupChat = {
					id: chat.id,
					chatId: chat.id,
					isGroup: true,
					name: chat.name,
					avatar: chat.img,
					groupChatAdminId: chat.groupChatAdminId,
				};

				const members = [];

				chat.membersId?.forEach((memberId) =>
					members.push(
						structuredClone(users.find((user) => user.id === memberId)),
					),
				);

				groupChat.members = members;

				allUserChats.push(groupChat);
			} else {
				const user = structuredClone(
					users.find((user) => user.id === chat.membersId[1]),
				);

				delete user.password;
				user.chatId = userChats[i].id;
				user.isGroup = false;

				if (user.chatId === newChatId) {
					return;
				}

				allUserChats.push(user);
			}
		});

		const chatsResult = allUserChats.map((userChat) => {
			const messagesData = structuredClone(
				messages.filter((message) => userChat.chatId === message.chatId),
			);

			messagesData.sort((a, b) => a.createdAt - b.createdAt);

			userChat.lastMessage = messagesData.at(-1)?.content;
			userChat.lastMessageAuthor = messagesData.at(-1)?.senderId;
			userChat.lastMessageTime = messagesData.at(-1)?.createdAt;

			if (userChat.isGroup) {
				const lastMessageAuthor = users.find(
					(user) => user.id === userChat.lastMessageAuthor,
				);

				userChat.lastMessageAuthorName = lastMessageAuthor?.name;
				userChat.lastMessageAuthorLastName = lastMessageAuthor?.lastName;
			}

			return { ...userChat, extra: messagesData };
		});

		// const chatsResult = await Promise.all(chatsData);
		chatsResult.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

		return chatsResult;
	};

	useEffect(() => {
		if (loginUserId) {
			usersAPI.getAllUsers().then(setUsers);
			usersAPI.getUser(loginUserId).then(setUser);
			contactsAPI
				.getContactListByUser(loginUserId)
				.then(setUserContactListId)
				.finally(() => setIsUserLoading(false));

			getChatList(loginUserId);
		}
	}, [loginUserId, setUserContactListId]);

	useEffect(() => {
		getUsersFromChatList(users, userChats).then(setChatList);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userChats]);

	useEffect(() => {
		if (newChatId && isCurrentChatGroup) {
			getChatList(loginUserId).then(() =>
				getUsersFromChatList(users, userChats).then(setChatList),
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newChatId, isCurrentChatGroup]);

	useEffect(() => {
		getChatList(loginUserId).then(() =>
			getUsersFromChatList(users, userChats).then(setChatList),
		);

		const lastMessage = messages.at(-1);

		const newChatList = structuredClone(chatList);

		newChatList.forEach((chat) => {
			if (chat?.chatId === lastMessage?.chatId) {
				chat.lastMessage = lastMessage.content;
				chat.lastMessageAuthor = lastMessage.senderId;
				chat.lastMessageTime = lastMessage.createdAt;
			}
		});

		newChatList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
		setChatList(newChatList);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	return {
		users,
		user,
		userChats,
		chatList,
		isUserLoading,
	};
};

export default useUser;
