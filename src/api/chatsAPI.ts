const chatsURL = 'http://localhost:3001/chats';
const messagesURL = 'http://localhost:3001/messages';

import type { Chat } from '../types/Chat.type';
import type { Message } from '../types/Message.type';

const headers = {
	'Content-Type': 'application/json',
};

const chatsAPI = {
	getAllChats: () => {
		return fetch(`${chatsURL}`).then((response) => response.json());
	},

	getAllNotGroupChats: () => {
		return fetch(`${chatsURL}?isGroup=false`).then((response) =>
			response.json(),
		);
	},

	getAllMessages: () => {
		return fetch(messagesURL).then((response) => response.json());
	},

	getMessagesByChatId: (chatId: string) => {
		return fetch(`${messagesURL}?chatId=${chatId}`).then((response) =>
			response.json(),
		);
	},

	getChatById: (chatId: string) => {
		return fetch(`${chatsURL}/${chatId}`).then((response) => response.json());
	},

	addMessage: (newMessage: Message) => {
		return fetch(messagesURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newMessage),
		}).then((response) => response.json());
	},

	createNewChat: (newChat: Chat) => {
		return fetch(chatsURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newChat),
		}).then((response) => response.json());
	},

	deleteChat: (chatId: string) => {
		return fetch(`${chatsURL}/${chatId}`, {
			method: 'DELETE',
		}).then((response) => response.json());
	},

	deleteMessageById: (id: string) => {
		return fetch(`${messagesURL}/${id}`, {
			method: 'DELETE',
		}).then((response) => response.json());
	},
};

export default chatsAPI;
