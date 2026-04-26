import { useEffect, useRef, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useChat = (loginUserId) => {
	const [messages, setMessages] = useState([]);
	const [currentChatId, setCurrentChatId] = useState(null);
	const [chatWithUser, setChatWithUser] = useState(null);
	const [currentChat, setCurrentChat] = useState([]);
	const [inputChat, setInputChat] = useState('');
	const [newMessageId, setNewMessageId] = useState(null);
	const [lastMessageId, setLastMessageId] = useState(null);

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
			chatId: Number(currentChatId),
			senderId: loginUserId,
			content: inputChat,
			createdAt: messageDate,
		};

		setCurrentChat((prev) => [...prev, newMessage]);
		setMessages((prev) => [...prev, newMessage]);
		chatsAPI.addMessage(newMessage);

		setNewMessageId(newMessage.id);

		setInputChat('');
	};

	useEffect(() => {
		chatsAPI.getAllMessanges().then(setMessages);
	}, []);

	useEffect(() => {
		if (newMessageId) {
			endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [newMessageId]);

	useEffect(() => {
		if (currentChatId) {
			chatsAPI.getChatById(currentChatId).then((chat) => {
				const chatWithUserId = chat.membersId.filter(
					(id) => id !== loginUserId,
				);
				usersAPI.getUser(chatWithUserId[0]).then(setChatWithUser);
			});

			chatsAPI.getMessagesByChatId(Number(currentChatId)).then((chat) => {
				setCurrentChat(chat);
				setLastMessageId(chat.at(-1).id);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChatId]);

	useEffect(() => {
		if (lastMessageId) {
			requestAnimationFrame(() => {
				endOfMessagesRef.current?.scrollIntoView({ block: 'end' });
			});
		}
	}, [lastMessageId]);

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
	};
};

export default useChat;
