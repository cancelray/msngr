import { useEffect, useRef, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useChat = (
	loginUserId,
	isContactListShow,
	setIsContactListShow,
	setIsSidebarDropdownShow,
) => {
	const [messages, setMessages] = useState([]);
	const [currentChatId, setCurrentChatId] = useState(null);
	const [chatWithUser, setChatWithUser] = useState(null);
	const [groupChat, setGroupChat] = useState(null);
	const [currentChat, setCurrentChat] = useState([]);
	const [inputChat, setInputChat] = useState('');
	const [isNewMessage, setIsNewMessage] = useState(false);
	const [newChatId, setNewChatId] = useState(null);
	const [isCurrentChatGroup, setisCurrentChatGroup] = useState(false);

	const chatWrapperRef = useRef(null);
	const endOfMessagesRef = useRef(null);

	const sendMessage = (event) => {
		event.preventDefault();

		if (inputChat.trim().length === 0) {
			return;
		}

		const messageDate = Date.now();

		const newMessage = {
			chatId: currentChatId,
			senderId: loginUserId,
			content: inputChat,
			createdAt: messageDate,
		};

		chatsAPI.addMessage(newMessage).then((respNewMessage) => {
			setMessages((prev) => [...prev, respNewMessage]);
			setCurrentChat((prev) => [...prev, respNewMessage]);
		});

		setIsNewMessage(true);
		setInputChat('');
	};

	const createNewChat = (userId) => {
		const newChat = {
			membersId: [loginUserId, userId],
			isGroup: false,
			name: '',
			chatImg: '',
		};

		chatsAPI.createNewChat(newChat).then((newChatResp) => {
			setCurrentChatId(newChatResp.id);
			setNewChatId(newChatResp.id);

			if (isContactListShow) {
				setIsContactListShow(false);
			}
		});
	};

	const deleteChat = () => {
		const isDeleteChat = confirm(
			'Are you sure you want to delete chat? (This will delete all messages from all chat members)',
		);

		if (isDeleteChat) {
			chatsAPI.deleteChat(currentChatId);
			currentChat.forEach((message) => chatsAPI.deleteMessageById(message.id));

			setCurrentChatId(null);
		}
	};

	const showChats = (event) => {
		event.preventDefault();
		setIsSidebarDropdownShow(false);

		if (isContactListShow) {
			setIsContactListShow(false);
		}
	};

	useEffect(() => {
		chatsAPI.getAllMessanges().then(setMessages);
	}, []);

	useEffect(() => {
		if (isNewMessage) {
			endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsNewMessage(false);
		}
	}, [isNewMessage]);

	useEffect(() => {
		if (newChatId && newChatId !== currentChatId) {
			chatsAPI.deleteChat(newChatId).then(() => setNewChatId(null));
		}

		if (currentChatId) {
			chatsAPI.getChatById(currentChatId).then((chat) => {
				const chatWithUserId = chat.membersId.filter(
					(id) => id !== loginUserId,
				);

				if (chatWithUserId.length < 2) {
					usersAPI.getUser(chatWithUserId[0]).then((user) => {
						setChatWithUser(user);
					});
				} else {
					const groupChat = [];

					chatWithUserId.forEach((userId) => {
						usersAPI.getUser(userId).then((user) => {
							groupChat.push(user);
						});
					});

					setGroupChat(groupChat);
				}
			});

			chatsAPI.getMessagesByChatId(currentChatId).then(setCurrentChat);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChatId]);

	useEffect(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				endOfMessagesRef.current?.scrollIntoView({ block: 'end' });
			});
		});
	}, [currentChat]);

	useEffect(() => {
		const handleClickEsc = (event) => {
			if (event.key === 'Escape') {
				setCurrentChatId(null);
				setChatWithUser(null);
				setCurrentChat([]);
			}
		};

		document.addEventListener('keydown', handleClickEsc);

		return () => {
			document.removeEventListener('keydown', handleClickEsc);
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
		inputChat,
		setInputChat,
		sendMessage,
		messages,
		chatWrapperRef,
		endOfMessagesRef,
		createNewChat,
		showChats,
		newChatId,
		setNewChatId,
		deleteChat,
		isCurrentChatGroup,
		setisCurrentChatGroup,
	};
};

export default useChat;
