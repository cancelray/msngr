const chatsURL = 'http://localhost:3001/chats';
const messagesURL = 'http://localhost:3001/messages';

const headers = {
	'Content-Type': 'application/json',
};

const chatsAPI = {
	getMessangersByChatId: (chatId) => {
		return fetch(`${messagesURL}?chatId=${chatId}`).then((response) =>
			response.json(),
		);
	},

	getChatById: (chatId) => {
		return fetch(`${chatsURL}/${chatId}`).then((response) => response.json());
	},
};

export default chatsAPI;
