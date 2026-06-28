import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import contactsAPI from '../api/contactsAPI';

import type { Contact } from '../types/Contact.type';
import type { User } from '../types/User.type';

import type { State } from '../types/store/state.type';

const useContacts = (
	users: User[],
	userContactListId: Contact[],
	setUserContactListId: React.Dispatch<React.SetStateAction<Contact[]>>,
	chatWithUser: User | null,
) => {
	const loginUserId = useSelector(
		(state: State) => state.loginUserId?.loginUserId,
	);

	const [userContactList, setUserContactList] = useState<User[]>([]);

	const getContactList = useCallback(
		(contactListId: Contact[]) => {
			if (users) {
				const contactList: User[] = contactListId?.flatMap((contact) => {
					const foundUser = users.find((user) => {
						return isNaN(Number(user.id))
							? user.id === contact.contactId
							: Number(user.id) === contact.contactId;
					});
					return foundUser ? [foundUser] : [];
				});

				contactList.sort((a, b) => a.name.localeCompare(b.name));

				setUserContactList(contactList);
			}
		},
		[users],
	);

	const addContact = useCallback(() => {
		const newContact: Contact = {
			userId: loginUserId as string,
			contactId: !isNaN(Number(chatWithUser?.id))
				? Number(chatWithUser?.id)
				: chatWithUser?.id,
		};

		contactsAPI
			.addContact(newContact)
			.then(() => setUserContactListId((prev) => [...prev, newContact]))
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
		async (event: React.MouseEvent<HTMLAnchorElement>) => {
			event.preventDefault();

			if (event.currentTarget.dataset.isDisable) {
				return;
			}

			try {
				if (chatWithUser && chatWithUser.id && loginUserId) {
					const resp = await contactsAPI
						.getContact(loginUserId, chatWithUser.id)
						.catch((err) => alert(err));

					await contactsAPI
						.deleteContact(resp[0].id)
						.catch((err) => alert(err));
				}
			} finally {
				if (loginUserId) {
					const resp = await contactsAPI
						.getContactListByUser(loginUserId)
						.catch((err) => alert(err));

					setUserContactListId(resp);
				}
			}
		},
		[loginUserId, chatWithUser, setUserContactListId],
	);

	useEffect(() => {
		if (userContactListId) {
			const getContacts = () => getContactList(userContactListId);
			getContacts();
		}
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
