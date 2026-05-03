const contactsURL = 'http://localhost:3001/contacts';

const headers = {
	'Content-Type': 'application/json',
};

const contactsAPI = {
	getContactListByUser: (userId) => {
		return fetch(`${contactsURL}?userId=${userId}`).then((response) =>
			response.json(),
		);
	},

	addContact: (newContact) => {
		return fetch(contactsURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newContact),
		}).then((response) => response.json());
	},
};

export default contactsAPI;
