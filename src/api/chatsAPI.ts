const chatsURL = 'http://localhost:3001/chats';
const messagesURL = 'http://localhost:3001/messages';

import type { Chat } from '../types/Chat.type';
import type { Message } from '../types/Message.type';

const headers = {
	'Content-Type': 'application/json',
};

const chatsAPI = {
	getAllChats: () => {
		return fetch(`${chatsURL}`)
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	getAllNotGroupChats: () => {
		return fetch(`${chatsURL}?isGroup=false`)
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	getAllMessages: () => {
		return fetch(messagesURL)
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	getMessagesByChatId: (chatId: string) => {
		return fetch(`${messagesURL}?chatId=${chatId}`)
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	getChatById: (chatId: string) => {
		return fetch(`${chatsURL}/${chatId}`)
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	addMessage: (newMessage: Message) => {
		return fetch(messagesURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newMessage),
		})
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	createNewChat: (newChat: Chat) => {
		return fetch(chatsURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newChat),
		})
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	deleteChat: (chatId: string) => {
		return fetch(`${chatsURL}/${chatId}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.catch((err) => alert(err));
	},

	deleteMessageById: (id: string) => {
		return fetch(`${messagesURL}/${id}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.catch((err) => alert(err));
	},
};

export default chatsAPI;
