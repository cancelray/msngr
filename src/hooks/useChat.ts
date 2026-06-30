import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

import {
	addNewMessageToChat,
	closeCurrentChat,
	setCurrentChat,
} from '../store/chat/currentChat.slice';
import { closeChat } from '../store/chat/currentChatId.slice';
import { addNewMessage, setMessages } from '../store/chat/messages.slice';
import { setChatList } from '../store/chatList/chatList.slice';

import type { Chat, ChatListItem } from '../types/Chat.type';
import type { Message } from '../types/Message.type';
import type { User } from '../types/User.type';
import type { State } from '../types/store/state.type';

const useChat = (
	newChatId: string | null,
	setNewChatId: React.Dispatch<React.SetStateAction<string | null>>,
	getChatList: (loginUserId: string) => void,
	getUsersFromChatList: (
		users: User[],
		userChats: Chat[],
	) => Promise<ChatListItem[]>,
) => {
	const dispatch = useDispatch();

	const { loginUserId } = useSelector((state: State) => state.loginUserId);
	const { messages } = useSelector((state: State) => state.messages);
	const { users } = useSelector((state: State) => state.users);
	const { chatList } = useSelector((state: State) => state.chatList);
	const { userChats } = useSelector((state: State) => state.userChats);
	const { currentChatId } = useSelector((state: State) => state.currentChatId);
	const { currentChat } = useSelector((state: State) => state.currentChat);

	const [chatWithUser, setChatWithUser] = useState<User | null>(null);
	const [groupChat, setGroupChat] = useState<User[] | null>(null);
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

			await chatsAPI.addMessage(newMessage).then((respNewMessage) => {
				dispatch(addNewMessage(respNewMessage));
				dispatch(addNewMessageToChat(respNewMessage));
			});

			endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });

			callbackInputClear();
		},
		[dispatch, loginUserId, currentChatId, newChatId, setNewChatId],
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
						chatsAPI.deleteMessageById(message.id!),
					);
					await Promise.all(deleteMessages);
				})
				.then(() =>
					chatsAPI.getAllMessages().then((resp) => dispatch(setMessages(resp))),
				);

			dispatch(closeChat());
			setNewChatId(null);
		}
	}, [
		dispatch,
		loginUserId,
		chatList,
		currentChat,
		currentChatId,
		isCurrentChatGroup,
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
				.then((resp) => dispatch(setChatList(resp)));
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

						usersAPI.getUser(chatWithUserId[0]).then((user) => {
							setChatWithUser(user);
						});
					} else {
						setChatWithUser(null);

						const groupChat = chatWithUserId?.map((userId: string) =>
							usersAPI.getUser(userId),
						);

						if (groupChat) {
							Promise.all(groupChat).then(setGroupChat);
						}
					}
				});

			chatsAPI
				.getMessagesByChatId(currentChatId)
				.then((resp) => dispatch(setCurrentChat(resp)));
		}
	}, [
		dispatch,
		currentChatId,
		isNewChatGroup,
		messages,
		loginUserId,
		newChatId,
		getUsersFromChatList,
		userChats,
		users,
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

			getUsersFromChatList(users, userChats).then((resp) =>
				dispatch(setChatList(resp)),
			);
		}
	}, [
		dispatch,
		newChatId,
		isCurrentChatGroup,
		getChatList,
		getUsersFromChatList,
		loginUserId,
		setNewChatId,
		userChats,
		users,
	]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			dispatch(closeChat());
		};

		const handleClickEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				dispatch(closeChat());
				setChatWithUser(null);
				dispatch(closeCurrentChat());
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		document.addEventListener('keydown', handleClickEsc);

		return () => {
			document.removeEventListener('keydown', handleClickEsc);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [dispatch]);

	return {
		chatWithUser,
		setChatWithUser,
		groupChat,
		setGroupChat,
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
