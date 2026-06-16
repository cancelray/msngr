const usersURL = 'http://localhost:3001/users';

import type { User } from '../types/User.type';

const headers = {
	'Content-Type': 'application/json',
};

const usersAPI = {
	getAllUsers: () => {
		return fetch(usersURL).then((response) => response.json());
	},

	getUser: (userId: string) => {
		return fetch(`${usersURL}/${userId}`).then((response) => response.json());
	},

	getUserByLogin: (login: string) => {
		return fetch(`${usersURL}?login=${login}`).then((response) =>
			response.json(),
		);
	},

	addNewUser: (newUser: User) => {
		return fetch(usersURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newUser),
		}).then((response) => response.json());
	},
};

export default usersAPI;
