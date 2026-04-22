const chatsURL = 'http://localhost:3001/chats';
const messagesURL = 'http://localhost:3001/messages';

const headers = {
	'Content-Type': 'application/json',
};

const chatsAPI = {
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
};

export default chatsAPI;
