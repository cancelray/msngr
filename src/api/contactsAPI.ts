const contactsURL = 'http://localhost:3001/contacts';

import type { Contact } from '../types/Contact.type';

const headers = {
	'Content-Type': 'application/json',
};

const contactsAPI = {
	getContactListByUser: (userId: string) => {
		return fetch(`${contactsURL}?userId=${userId}`).then((response) =>
			response.json(),
		);
	},

	addContact: (newContact: Contact) => {
		return fetch(contactsURL, {
			method: 'POST',
			headers,
			body: JSON.stringify(newContact),
		}).then((response) => response.json());
	},

	getContact: (userId: string, contactId: string) => {
		return fetch(`${contactsURL}?userId=${userId}&contactId=${contactId}`).then(
			(response) => response.json(),
		);
	},

	deleteContact: (id: string) => {
		return fetch(`${contactsURL}/${id}`, {
			method: 'DELETE',
		}).then((response) => response.json());
	},
};

export default contactsAPI;
