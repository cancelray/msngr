import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

import type { Chat, ChatListItem } from '../types/Chat.type';
import type { Message } from '../types/Message.type';
import type { User } from '../types/User.type';
import type { State } from '../types/store/state.type';

const useChat = (
	messages: Message[],
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
	users: User[],
	chatList: ChatListItem[],
	setChatList: React.Dispatch<React.SetStateAction<ChatListItem[]>>,
	userChats: Chat[],
	newChatId: string | null,
	setNewChatId: React.Dispatch<React.SetStateAction<string | null>>,
	getChatList: (loginUserId: string) => void,
	getUsersFromChatList: (
		users: User[],
		userChats: Chat[],
	) => Promise<ChatListItem[]>,
) => {
	const loginUserId = useSelector(
		(state: State) => state.loginUserId?.loginUserId,
	);

	const [currentChatId, setCurrentChatId] = useState<string | null>(null);
	const [chatWithUser, setChatWithUser] = useState<User | null>(null);
	const [groupChat, setGroupChat] = useState<User[] | null>(null);
	const [currentChat, setCurrentChat] = useState<Chat[]>([]);
	const [isNewChatGroup, setIsNewChatGroup] = useState<boolean>(false);
	const [isCurrentChatGroup, setIsCurrentChatGroup] = useState<boolean>(false);

	const chatWrapperRef = useRef<HTMLDivElement>(null);
	const endOfMessagesRef = useRef<HTMLDivElement>(null);

	const sendMessage = useCallback(
		async (clearInput: string, callbackInputClear: () => void) => {
			if (newChatId) {
				setNewChatId(null);
			}

			const messageDate = Date.now();

			const newMessage: Message = {
				chatId: currentChatId!,
				senderId: loginUserId as string,
				content: clearInput,
				createdAt: messageDate,
			};

			await chatsAPI
				.addMessage(newMessage)
				.then((respNewMessage) => {
					setMessages((prev) => [...prev, respNewMessage]);
					setCurrentChat((prev) => [...prev, respNewMessage]);
				})
				.catch((err) => alert(err));

			endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });

			callbackInputClear();
		},
		[loginUserId, currentChatId, newChatId, setMessages, setNewChatId],
	);

	const deleteChat = useCallback(() => {
		if (isCurrentChatGroup) {
			const currentChat = chatList.find((chat) => chat.id === currentChatId);

			if (currentChat?.groupChatAdminId !== loginUserId) {
				alert('Only admin can delete group chat');
				return;
			}
		}

		const isDeleteChat = confirm(
			'Are you sure you want to delete chat? (This will delete all messages from all chat members)',
		);

		if (isDeleteChat) {
			chatsAPI
				.deleteChat(currentChatId!)
				.then(async () => {
					const deleteMessages = currentChat.map((message) =>
						chatsAPI.deleteMessageById(message.id!).catch((err) => alert(err)),
					);
					await Promise.all(deleteMessages);
				})
				.then(() =>
					chatsAPI
						.getAllMessages()
						.then(setMessages)
						.catch((err) => alert(err)),
				)
				.catch((err) => alert(err));

			setCurrentChatId(null);
			setNewChatId(null);
		}
	}, [
		loginUserId,
		chatList,
		currentChat,
		currentChatId,
		isCurrentChatGroup,
		setMessages,
		setNewChatId,
	]);

	useEffect(() => {
		if (
			newChatId &&
			newChatId !== currentChatId &&
			!isNewChatGroup &&
			!messages.find((message) => message.id === newChatId)
		) {
			chatsAPI
				.deleteChat(newChatId)
				.then(() => setNewChatId(null))
				.then(() => getUsersFromChatList(users, userChats))
				.then(setChatList)
				.catch((err) => alert(err));
		}

		if (currentChatId) {
			chatsAPI
				.getChatById(currentChatId)
				.then((chat) => {
					const chatWithUserId = chat.membersId?.filter(
						(id: string) => id !== loginUserId,
					);

					if (chatWithUserId?.length < 2) {
						setIsCurrentChatGroup(false);
						setGroupChat(null);

						usersAPI
							.getUser(chatWithUserId[0])
							.then((user) => {
								setChatWithUser(user);
							})
							.catch((err) => alert(err));
					} else {
						setChatWithUser(null);

						const groupChat = chatWithUserId?.map((userId: string) =>
							usersAPI.getUser(userId).catch((err) => alert(err)),
						);

						if (groupChat) {
							Promise.all(groupChat).then(setGroupChat);
						}
					}
				})
				.catch((err) => alert(err));

			chatsAPI
				.getMessagesByChatId(currentChatId)
				.then(setCurrentChat)
				.catch((err) => alert(err));
		}
	}, [
		currentChatId,
		isNewChatGroup,
		messages,
		loginUserId,
		newChatId,
		getUsersFromChatList,
		userChats,
		users,
		setChatList,
		setNewChatId,
	]);

	useEffect(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				endOfMessagesRef.current?.scrollIntoView({ block: 'end' });
			});
		});
	}, [currentChat]);

	useEffect(() => {
		if (newChatId && isCurrentChatGroup && loginUserId) {
			setNewChatId(null);
			getChatList(loginUserId);

			getUsersFromChatList(users, userChats).then(setChatList);
		}
	}, [
		newChatId,
		isCurrentChatGroup,
		getChatList,
		getUsersFromChatList,
		loginUserId,
		setChatList,
		setNewChatId,
		userChats,
		users,
	]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			setCurrentChatId(null);
		};

		const handleClickEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setCurrentChatId(null);
				setChatWithUser(null);
				setCurrentChat([]);
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		document.addEventListener('keydown', handleClickEsc);

		return () => {
			document.removeEventListener('keydown', handleClickEsc);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return {
		setCurrentChatId,
		chatWithUser,
		setChatWithUser,
		groupChat,
		setGroupChat,
		currentChatId,
		currentChat,
		sendMessage,
		chatWrapperRef,
		endOfMessagesRef,
		deleteChat,
		isCurrentChatGroup,
		setIsCurrentChatGroup,
		setIsNewChatGroup,
	};
};

export default useChat;
