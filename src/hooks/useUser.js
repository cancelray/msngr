import { useCallback, useEffect, useState } from 'react';

import chatsAPI from '../api/chatsAPI';
import contactsAPI from '../api/contactsAPI';
import usersAPI from '../api/usersAPI';

const useUser = (loginUserId) => {
	const [user, setUser] = useState({});
	const [userContactListId, setUserContactListId] = useState([]);
	const [isUserLoading, setIsUserLoading] = useState(true);
	const [userChats, setUserChats] = useState([]);

	const getChatList = useCallback(
		async (userId) => {
			await chatsAPI.getAllChats().then((chats) => {
				const filteredChats = structuredClone(
					chats.filter((chat) => chat.membersId.includes(userId)),
				);

				filteredChats.forEach((chat) => {
					const userIndex = chat.membersId.indexOf(userId);

					if (userIndex !== 0) {
						const [item] = chat.membersId.splice(userIndex, 1);
						chat.membersId.unshift(item);
					}
				});

				setUserChats(filteredChats);
			});
		},
		[setUserChats],
	);

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
		userChats,
		setUserChats,
	};
};

export default useUser;
