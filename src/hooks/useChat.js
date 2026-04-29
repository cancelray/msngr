import { useEffect, useRef, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useChat = (
	loginUserId,
	isContactListShow,
	setIsContactListShow,
	setIsDropdownShow,
) => {
	const [messages, setMessages] = useState([]);
	const [currentChatId, setCurrentChatId] = useState(null);
	const [chatWithUser, setChatWithUser] = useState(null);
	const [currentChat, setCurrentChat] = useState([]);
	const [inputChat, setInputChat] = useState('');
	const [isNewMessage, setIsNewMessage] = useState(false);

	const chatWrapperRef = useRef(null);
	const endOfMessagesRef = useRef(null);

	const sendMessage = (event) => {
		event.preventDefault();

		if (inputChat.trim().length === 0) {
			return;
		}

		const messageDate = Date.now();

		const newMessage = {
			id: crypto.randomUUID(),
			chatId: currentChatId,
			senderId: loginUserId,
			content: inputChat,
			createdAt: messageDate,
		};

		setCurrentChat((prev) => [...prev, newMessage]);
		setMessages((prev) => [...prev, newMessage]);
		chatsAPI.addMessage(newMessage);

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
			if (isContactListShow) {
				setIsContactListShow(false);
			}
		});
	};

	const showChats = (event) => {
		event.preventDefault();
		setIsDropdownShow(false);

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
		if (currentChatId) {
			chatsAPI.getChatById(currentChatId).then((chat) => {
				const chatWithUserId = chat.membersId.filter(
					(id) => id !== loginUserId,
				);

				usersAPI.getUser(chatWithUserId[0]).then(setChatWithUser);
			});

			chatsAPI.getMessagesByChatId(currentChatId).then((chat) => {
				setCurrentChat(chat);
			});
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
	};
};

export default useChat;
