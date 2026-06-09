import { useCallback, useEffect, useState } from 'react';

import chatsAPI from '../api/chatsAPI';

const useChatList = (messages, users, loginUserId) => {
	const [chatList, setChatList] = useState([]);
	const [userChats, setUserChats] = useState([]);
	const [newChatId, setNewChatId] = useState(null);

	const getChatList = useCallback(
		async (userId) => {
			await chatsAPI.getAllChats().then((chats) => {
				const filteredChats = structuredClone(
					chats.filter((chat) => chat.membersId.includes(userId)),
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
		},
		[setUserChats],
	);

	const getUsersFromChatList = useCallback(
		async (users, userChats) => {
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

					if (user) {
						delete user.password;
						user.chatId = userChats[i].id;
						user.isGroup = false;

						if (user.chatId === newChatId) {
							return;
						}
					}

					allUserChats.push(user);
				}
			});

			const chatsResult = allUserChats.map((userChat) => {
				const messagesData = structuredClone(
					messages.filter((message) => userChat.chatId === message.chatId),
				);

				messagesData.sort((a, b) => a.createdAt - b.createdAt);

				if (userChat) {
					userChat.lastMessage = messagesData.at(-1)?.content;
					userChat.lastMessageAuthor = messagesData.at(-1)?.senderId;
					userChat.lastMessageTime = messagesData.at(-1)?.createdAt;
				}

				if (userChat?.isGroup) {
					const lastMessageAuthor = users.find(
						(user) => user.id === userChat.lastMessageAuthor,
					);

					userChat.lastMessageAuthorName = lastMessageAuthor?.name;
					userChat.lastMessageAuthorLastName = lastMessageAuthor?.lastName;
				}

				return { ...userChat, extra: messagesData };
			});

			chatsResult.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

			return chatsResult;
		},
		[messages, newChatId],
	);

	useEffect(() => {
		getChatList(loginUserId).then(() =>
			getUsersFromChatList(users, userChats).then(setChatList),
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loginUserId, messages, newChatId]);

	useEffect(() => {
		getUsersFromChatList(users, userChats).then(setChatList);
	}, [userChats, getUsersFromChatList, setChatList, users]);

	return {
		chatList,
		setChatList,
		userChats,
		newChatId,
		setNewChatId,
		getUsersFromChatList,
		getChatList,
	};
};

export default useChatList;
