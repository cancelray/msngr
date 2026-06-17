import { useCallback, useEffect, useState } from 'react';

import type { Chat, ChatListItem } from '../types/Chat.type';
import type { Message } from '../types/Message.type';
import type { User } from '../types/User.type';

const useChatList = (
	messages: Message[],
	users: User[],
	loginUserId: string | null,
	userChats: Chat[],
	getChatList: (loginUserId: string) => void,
) => {
	const [chatList, setChatList] = useState<ChatListItem[]>([]);
	const [newChatId, setNewChatId] = useState<string | null>(null);

	const getUsersFromChatList: (
		users: User[],
		userChats: Chat[],
	) => Promise<ChatListItem[]> = useCallback(
		async (users: User[], userChats: Chat[]) => {
			const allUserChats: Chat[] = [];

			userChats.forEach((chat, i) => {
				if (chat.isGroup) {
					const groupChat: Chat = {
						id: chat.id,
						membersId: [],
						chatId: chat.id,
						isGroup: true,
						name: chat.name,
						avatar: chat.img!,
						groupChatAdminId: chat.groupChatAdminId,
					};

					const members: User[] = [];

					chat.membersId?.forEach((memberId) =>
						members.push(
							structuredClone(users.find((user) => user.id === memberId)!),
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

						const chatListItem: ChatListItem = {
							...user,
							isGroup: false,
							membersId: [],
							createdAt: '',
							lastMessageTime: 0,
						};

						chatListItem.chatId = userChats[i].id;
						chatListItem.isGroup = false;

						if (chatListItem.chatId === newChatId) {
							return;
						}

						allUserChats.push(chatListItem);
					}
				}
			});

			const chatsResult = allUserChats.map((userChat) => {
				const messagesData = structuredClone(
					messages.filter((message) => userChat.chatId === message.chatId),
				);

				messagesData.sort((a, b) => a.createdAt! - b.createdAt!);

				const userChatListItem: ChatListItem = structuredClone(userChat);

				if (userChatListItem) {
					userChatListItem.lastMessage = messagesData.at(-1)?.content;
					userChatListItem.lastMessageAuthor = String(
						messagesData.at(-1)?.senderId,
					);

					userChatListItem.lastMessageTime = messagesData.at(-1)?.createdAt;
				}

				if (userChatListItem?.isGroup) {
					const lastMessageAuthor = users.find(
						(user) => user.id === userChatListItem.lastMessageAuthor,
					);

					userChatListItem.lastMessageAuthorName = lastMessageAuthor?.name;
					userChatListItem.lastMessageAuthorLastName =
						lastMessageAuthor?.lastName;
				}

				return { ...userChatListItem, extra: messagesData };
			});

			chatsResult.sort((a, b) => b.lastMessageTime! - a.lastMessageTime!);

			const result: ChatListItem[] = [...chatsResult];

			return result;
		},
		[messages, newChatId],
	);

	useEffect(() => {
		if (loginUserId) {
			getChatList(loginUserId);
		}
	}, [loginUserId, newChatId, getChatList, getUsersFromChatList, users]);

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
