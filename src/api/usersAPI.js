const usersURL = 'http://localhost:3001/users';
const contactsURL = 'http://localhost:3001/contacts';
const chatsURL = 'http://localhost:3001/chats';
const chatMembersURL = 'http://localhost:3001/chatMembers';
const messagesURL = 'http://localhost:3001/messages';

const headers = {
	'Content-Type': 'application/json',
};

const usersAPI = {
	getUser: (userId) => {
		return fetch(`${usersURL}/${userId}`).then((response) => response.json());
	},

	getContactList: (userId) => {
		return fetch(`${contactsURL}/?userId=${userId}`).then((response) =>
			response.json(),
		);
	},

	getAllChats: () => {
		return fetch(`${chatsURL}`).then((response) => response.json());
	},
};

export default usersAPI;
