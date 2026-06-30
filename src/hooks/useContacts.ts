import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import contactsAPI from '../api/contactsAPI';

import {
	addNewContact,
	setUserContactListId,
} from '../store/userContactList/userContactListId.slice';

import type { Contact } from '../types/Contact.type';
import type { User } from '../types/User.type';

import type { State } from '../types/store/state.type';

const useContacts = (chatWithUser: User | null) => {
	const dispatch = useDispatch();

	const { loginUserId } = useSelector((state: State) => state.loginUserId);

	const addContact = useCallback(() => {
		const newContact: Contact = {
			userId: !isNaN(Number(loginUserId)) ? Number(loginUserId) : loginUserId,
			contactId: !isNaN(Number(chatWithUser?.id))
				? Number(chatWithUser?.id)
				: chatWithUser?.id,
		};

		contactsAPI
			.addContact(newContact)
			.then(() => dispatch(addNewContact(newContact)));
	}, [dispatch, loginUserId, chatWithUser]);

	const deleteContact = useCallback(
		async (event: React.MouseEvent<HTMLAnchorElement>) => {
			event.preventDefault();

			if (event.currentTarget.dataset.isDisable) {
				return;
			}

			try {
				if (chatWithUser && chatWithUser.id && loginUserId) {
					const resp = await contactsAPI.getContact(
						loginUserId,
						chatWithUser.id,
					);

					await contactsAPI.deleteContact(resp[0].id);
				}
			} finally {
				if (loginUserId) {
					const resp = await contactsAPI.getContactListByUser(loginUserId);

					dispatch(setUserContactListId(resp));
				}
			}
		},
		[dispatch, loginUserId, chatWithUser],
	);

	return {
		addContact,
		deleteContact,
	};
};

export default useContacts;
