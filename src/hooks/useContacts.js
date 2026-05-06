import { useEffect, useState } from 'react';

import contactsAPI from '../api/contactsAPI';
import usersAPI from '../api/usersAPI';

const useContacts = (
	loginUserId,
	chatWithUser,
	setCurrentChatId,
	setIsSidebarDropdownShow,
	isContactListShow,
	setIsContactListShow,
) => {
	const [userContactListId, setUserContactListId] = useState([]);
	const [userContactList, setUserContactList] = useState([]);

	const getContactList = (contactListId) => {
		return Promise.all(
			contactListId?.map((contact) => usersAPI.getUser(contact.contactId)),
		).then((contactList) => {
			contactList.sort((a, b) => a.name.localeCompare(b.name));

			setUserContactList(contactList);
		});
	};

	const addContact = () => {
		const newContact = {
			userId: !isNaN(Number(loginUserId)) ? Number(loginUserId) : loginUserId,
			contactId: !isNaN(Number(chatWithUser.id))
				? Number(chatWithUser.id)
				: chatWithUser.id,
		};

		contactsAPI
			.addContact(newContact)
			.then(setUserContactListId((prev) => [...prev, newContact]))
			.finally(getContactList(userContactListId));
	};

	const deleteContact = async (event) => {
		event.preventDefault();

		try {
			const resp = await contactsAPI.getContact(loginUserId, chatWithUser.id);
			await contactsAPI.deleteContact(resp[0].id);
		} finally {
			const resp = await contactsAPI.getContactListByUser(loginUserId);
			setUserContactListId(resp);
		}
	};

	const showContacts = (event) => {
		event.preventDefault();

		setIsSidebarDropdownShow(false);
		setCurrentChatId(null);

		if (!isContactListShow) {
			setIsContactListShow(true);
		}
	};

	useEffect(() => {
		getContactList(userContactListId);
	}, [userContactListId]);

	return {
		userContactListId,
		setUserContactListId,
		userContactList,
		showContacts,
		addContact,
		deleteContact,
	};
};

export default useContacts;
