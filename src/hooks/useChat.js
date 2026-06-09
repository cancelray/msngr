import { useCallback, useEffect, useRef, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useChat = (
	messages,
	setMessages,
	users,
	loginUserId,
	isContactListShow,
	setIsContactListShow,
	setIsCreateGroupChatShow,
	chatList,
	setChatList,
	userChats,
	setUserChats,
	newChatId,
	setNewChatId,
	getChatList,
	getUsersFromChatList,
) => {
	const [currentChatId, setCurrentChatId] = useState(null);
	const [chatWithUser, setChatWithUser] = useState(null);
	const [groupChat, setGroupChat] = useState(null);
	const [currentChat, setCurrentChat] = useState([]);
	const [isNewChatGroup, setIsNewChatGroup] = useState(false);
	const [isCurrentChatGroup, setIsCurrentChatGroup] = useState(false);

	const chatWrapperRef = useRef(null);
	const endOfMessagesRef = useRef(null);

	const sendMessage = useCallback(
		(clearInput, callbackInputClear) => {
			if (newChatId) {
				setNewChatId(null);
			}

			const messageDate = Date.now();

			const newMessage = {
				chatId: currentChatId,
				senderId: loginUserId,
				content: clearInput,
				createdAt: messageDate,
			};

			chatsAPI.addMessage(newMessage).then((respNewMessage) => {
				setMessages((prev) => [...prev, respNewMessage]);
				setCurrentChat((prev) => [...prev, respNewMessage]);
			});

			endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });

			callbackInputClear();
		},
		[loginUserId, currentChatId, newChatId, setMessages, setNewChatId],
	);

	const deleteChat = useCallback(() => {
		if (isCurrentChatGroup) {
			const currentChat = chatList.find((chat) => chat.id === currentChatId);

			if (currentChat.groupChatAdminId !== loginUserId) {
				alert('Only admin can delete group chat');
				return;
			}
		}

		const isDeleteChat = confirm(
			'Are you sure you want to delete chat? (This will delete all messages from all chat members)',
		);

		if (isDeleteChat) {
			chatsAPI
				.deleteChat(currentChatId)
				.then(async () => {
					const deleteMessages = currentChat.map((message) =>
						chatsAPI.deleteMessageById(message.id),
					);
					await Promise.all(deleteMessages);
				})
				.then(() => chatsAPI.getAllMessages().then(setMessages));

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
				.then(getUsersFromChatList(users, userChats).then(setChatList));
		}

		if (currentChatId) {
			chatsAPI.getChatById(currentChatId).then((chat) => {
				const chatWithUserId = chat.membersId?.filter(
					(id) => id !== loginUserId,
				);

				if (chatWithUserId?.length < 2) {
					setGroupChat(null);

					usersAPI.getUser(chatWithUserId[0]).then((user) => {
						setChatWithUser(user);
					});
				} else {
					setChatWithUser(null);

					const groupChat = chatWithUserId?.map((userId) =>
						usersAPI.getUser(userId),
					);

					if (groupChat) {
						Promise.all(groupChat).then(setGroupChat);
					}
				}
			});

			chatsAPI.getMessagesByChatId(currentChatId).then(setCurrentChat);
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
		if (newChatId && isCurrentChatGroup) {
			getChatList(loginUserId).then(() =>
				getUsersFromChatList(users, userChats).then(setChatList),
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newChatId, isCurrentChatGroup]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			setCurrentChatId(null);
		};

		const handleClickEsc = (event) => {
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
