const chatsURL = 'http://localhost:3001/chats';
const messagesURL = 'http://localhost:3001/messages';

const headers = {
	'Content-Type': 'application/json',
};

const chatsAPI = {
	getAllChats: () => {
		return fetch(`${chatsURL}`).then((response) => response.json());
	},

	getAllMessanges: () => {
		return fetch(messagesURL).then((response) => response.json());
	},

	getMessagesByChatId: (chatId) => {
		return fetch(`${messagesURL}?chatId=${chatId}`).then((response) =>
			response.json(),
		);
	},

	getChatById: (chatId) => {
		return fetch(`${chatsURL}/${chatId}`).then((response) => response.json());
	},

	addMessage: (newMessage) => {
		return fetch(messagesURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newMessage),
		}).then((response) => response.json());
	},

	createNewChat: (newChat) => {
		return fetch(chatsURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newChat),
		}).then((response) => response.json());
	},

	deleteChat: (chatId) => {
		return fetch(`${chatsURL}/${chatId}`, {
			method: 'DELETE',
		}).then((response) => response.json());
	},

	deleteMessageById: (id) => {
		return fetch(`${messagesURL}/${id}`, {
			method: 'DELETE',
		}).then((response) => response.json());
	},
};

export default chatsAPI;
