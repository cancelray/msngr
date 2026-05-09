import { useEffect, useRef, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useChat = (
	loginUserId,
	isContactListShow,
	setIsContactListShow,
	setIsCreateGroupChatShow,
	setIsSidebarDropdownShow,
) => {
	const [messages, setMessages] = useState([]);
	const [chatList, setChatList] = useState([]);
	const [currentChatId, setCurrentChatId] = useState(null);
	const [chatWithUser, setChatWithUser] = useState(null);
	const [groupChat, setGroupChat] = useState(null);
	const [currentChat, setCurrentChat] = useState([]);
	const [inputChat, setInputChat] = useState('');
	const [isNewMessage, setIsNewMessage] = useState(false);
	const [newChatId, setNewChatId] = useState(null);
	const [isNewChatGroup, setIsNewChatGroup] = useState(false);
	const [isCurrentChatGroup, setIsCurrentChatGroup] = useState(false);
	const [isChecked, setIsChecked] = useState({});
	const [groupChatName, setGroupChatName] = useState('');

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
		setIsNewChatGroup(false);

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

	const createGroupChat = () => {
		setIsNewChatGroup(true);

		const usersInGroupChat = Object.getOwnPropertyNames(isChecked);

		if (usersInGroupChat.length < 2) {
			return;
		}

		usersInGroupChat.push(loginUserId);

		const newGroupChat = {
			membersId: usersInGroupChat,
			isGroup: true,
			name: groupChatName.trim(),
			chatImg: '',
			groupChatAdminId: loginUserId,
		};

		chatsAPI.createNewChat(newGroupChat).then((newChatResp) => {
			setCurrentChatId(newChatResp.id);
			setNewChatId(newChatResp.id);

			setIsCurrentChatGroup(true);

			setIsCreateGroupChatShow(false);
			setIsContactListShow(false);
			setIsChecked({});
			setGroupChatName('');
		});
	};

	const deleteChat = () => {
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
				.then(() => {
					currentChat.forEach((message) =>
						chatsAPI.deleteMessageById(message.id),
					);
				})
				.then(chatsAPI.getAllMessages().then(setMessages));

			setCurrentChatId(null);
		}
	};

	const showChats = (event) => {
		event.preventDefault();

		setIsSidebarDropdownShow(false);
		setIsChecked({});
		setGroupChatName('');

		if (isContactListShow) {
			setIsContactListShow(false);
		}
	};

	useEffect(() => {
		chatsAPI.getAllMessages().then(setMessages);
	}, []);

	useEffect(() => {
		if (isNewMessage) {
			endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsNewMessage(false);
		}
	}, [isNewMessage]);

	useEffect(() => {
		if (
			newChatId &&
			!isNewChatGroup &&
			!messages.find((message) => message.id === newChatId)
		) {
			chatsAPI.deleteChat(newChatId).then(() => setNewChatId(null));
		}

		if (currentChatId) {
			chatsAPI.getChatById(currentChatId).then((chat) => {
				const chatWithUserId = chat.membersId.filter(
					(id) => id !== loginUserId,
				);

				if (chatWithUserId.length < 2) {
					setGroupChat(null);

					usersAPI.getUser(chatWithUserId[0]).then((user) => {
						setChatWithUser(user);
					});
				} else {
					setChatWithUser(null);

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
		const handleBeforeUnload = () => {
			if (
				newChatId &&
				!isNewChatGroup &&
				!messages.find((message) => message.id === newChatId)
			) {
				chatsAPI.deleteChat(newChatId);
			}
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		chatList,
		setChatList,
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
		setIsCurrentChatGroup,
		createGroupChat,
		isChecked,
		setIsChecked,
		groupChatName,
		setGroupChatName,
	};
};

export default useChat;
