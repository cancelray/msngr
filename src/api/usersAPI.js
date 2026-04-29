const usersURL = 'http://localhost:3001/users';
const contactsURL = 'http://localhost:3001/contacts';
const chatsURL = 'http://localhost:3001/chats';

const headers = {
	'Content-Type': 'application/json',
};

const usersAPI = {
	getAllUsers: () => {
		return fetch(usersURL).then((response) => response.json());
	},

	getUser: (userId) => {
		return fetch(`${usersURL}/${userId}`).then((response) => response.json());
	},

	getUserByLogin: (login) => {
		return fetch(`${usersURL}?login=${login}`).then((response) =>
			response.json(),
		);
	},

	addNewUser: (newUser) => {
		return fetch(usersURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newUser),
		}).then((response) => response.json());
	},

	getContactList: (userId) => {
		return fetch(`${contactsURL}?userId=${userId}`).then((response) =>
			response.json(),
		);
	},

	getAllChats: () => {
		return fetch(`${chatsURL}`).then((response) => response.json());
	},
};

export default usersAPI;
