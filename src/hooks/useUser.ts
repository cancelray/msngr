import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import chatsAPI from '../api/chatsAPI';
import contactsAPI from '../api/contactsAPI';
import usersAPI from '../api/usersAPI';

import type { Chat } from '../types/Chat.type';
import type { Contact } from '../types/Contact.type';
import type { User } from '../types/User.type';
import type { State } from '../types/store/state.type';

const useUser = () => {
	const loginUserId = useSelector(
		(state: State) => state.loginUserId?.loginUserId,
	);

	const [user, setUser] = useState<User | null>(null);
	const [userContactListId, setUserContactListId] = useState<Contact[]>([]);
	const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
	const [userChats, setUserChats] = useState<Chat[]>([]);

	const getChatList = useCallback(
		async (userId: string) => {
			await chatsAPI
				.getAllChats()
				.then((chats) => {
					const filteredChats = structuredClone(
						chats.filter((chat: Chat) => chat.membersId.includes(userId)),
					);

					filteredChats.forEach((chat: Chat) => {
						const userIndex = chat.membersId.indexOf(userId);

						if (userIndex !== 0) {
							const [item] = chat.membersId.splice(userIndex, 1);
							chat.membersId.unshift(item);
						}
					});

					setUserChats(filteredChats);
				})
				.catch((err) => alert(err));
		},
		[setUserChats],
	);

	useEffect(() => {
		if (loginUserId) {
			usersAPI
				.getUser(loginUserId)
				.then(setUser)
				.catch((err) => alert(err));

			contactsAPI
				.getContactListByUser(loginUserId)
				.then(setUserContactListId)
				.then(() => setIsUserLoading(false))
				.catch((err) => alert(err));

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
