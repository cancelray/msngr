import { useEffect, useState } from 'react';

import usersAPI from '../api/usersAPI';

const useContacts = (
	setCurrentChatId,
	setIsDropdownShow,
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

	const showContacts = (event) => {
		event.preventDefault();
		setIsDropdownShow(false);
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
		isContactListShow,
		setIsContactListShow,
	};
};

export default useContacts;
