import { useEffect, useState } from 'react';
import chatsAPI from '../api/chatsAPI';
import usersAPI from '../api/usersAPI';

const useChat = () => {
	const [currentChatId, setCurrentChatId] = useState(null);
	const [chatWithUser, setChatWithUser] = useState(null);
	const [currentChat, setCurrentChat] = useState([]);

	useEffect(() => {
		if (currentChatId) {
			chatsAPI.getChatById(currentChatId).then((chat) => {
				const chatWithUserId = chat.membersId.filter(
					(elem) => elem !== Number(localStorage.getItem('loginUserId')),
				);
				usersAPI.getUser(chatWithUserId[0]).then(setChatWithUser);
			});

			chatsAPI
				.getMessangersByChatId(Number(currentChatId))
				.then(setCurrentChat);
		}
	}, [currentChatId]);

	return { setCurrentChatId, chatWithUser, currentChat };
};

export default useChat;
