import { useEffect, useState } from 'react';

import contactsAPI from '../api/contactsAPI';
import usersAPI from '../api/usersAPI';

const useUser = (loginUserId, getChatList) => {
	const [user, setUser] = useState({});
	const [userContactListId, setUserContactListId] = useState([]);
	const [isUserLoading, setIsUserLoading] = useState(true);

	useEffect(() => {
		if (loginUserId) {
			usersAPI.getUser(loginUserId).then(setUser);
			contactsAPI
				.getContactListByUser(loginUserId)
				.then(setUserContactListId)
				.finally(() => setIsUserLoading(false));

			getChatList(loginUserId);
		}
	}, [loginUserId, setUserContactListId, getChatList]);

	return {
		user,
		isUserLoading,
		userContactListId,
		setUserContactListId,
		getChatList,
	};
};

export default useUser;
