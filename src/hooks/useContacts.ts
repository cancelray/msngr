import { useCallback, useEffect, useState } from 'react';

import contactsAPI from '../api/contactsAPI';

const useContacts = (
	loginUserId,
	users,
	userContactListId,
	setUserContactListId,
	chatWithUser,
) => {
	const [userContactList, setUserContactList] = useState([]);

	const getContactList = useCallback(
		(contactListId) => {
			if (users) {
				const contactList = contactListId?.map((contact) =>
					users.find((user) => {
						return isNaN(Number(user.id))
							? user.id === contact.contactId
							: Number(user.id) === contact.contactId;
					}),
				);

				contactList.sort((a, b) => a.name.localeCompare(b.name));
				setUserContactList(contactList);
			}
		},
		[users],
	);

	const addContact = useCallback(() => {
		const newContact = {
			userId: !isNaN(Number(loginUserId)) ? Number(loginUserId) : loginUserId,
			contactId: !isNaN(Number(chatWithUser.id))
				? Number(chatWithUser.id)
				: chatWithUser.id,
		};

		contactsAPI
			.addContact(newContact)
			.then(
				async () => await setUserContactListId((prev) => [...prev, newContact]),
			)
			.then(() => getContactList(userContactListId))
			.catch((err) => alert(err));
	}, [
		loginUserId,
		userContactListId,
		chatWithUser,
		getContactList,
		setUserContactListId,
	]);

	const deleteContact = useCallback(
		async (event) => {
			event.preventDefault();

			if (event.currentTarget.dataset.isDisable) {
				return;
			}

			try {
				const resp = await contactsAPI
					.getContact(loginUserId, chatWithUser.id)
					.catch((err) => alert(err));

				await contactsAPI.deleteContact(resp[0].id).catch((err) => alert(err));
			} finally {
				const resp = await contactsAPI
					.getContactListByUser(loginUserId)
					.catch((err) => alert(err));
					
				setUserContactListId(resp);
			}
		},
		[loginUserId, chatWithUser, setUserContactListId],
	);

	useEffect(() => {
		getContactList(userContactListId);
	}, [userContactListId, getContactList]);

	return {
		userContactListId,
		setUserContactListId,
		userContactList,
		addContact,
		deleteContact,
	};
};

export default useContacts;
