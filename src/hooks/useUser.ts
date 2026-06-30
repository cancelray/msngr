import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import chatsAPI from '../api/chatsAPI';
import contactsAPI from '../api/contactsAPI';
import usersAPI from '../api/usersAPI';

import type { Chat } from '../types/Chat.type';

import { selectLoginUserId } from '../store/auth/loginUserId.slice';
import { setUser } from '../store/auth/user.slice';
import { setUserChats } from '../store/chatList/userChats.slice';
import { setUserContactListId } from '../store/userContactList/userContactListId.slice';

const useUser = () => {
	const dispatch = useDispatch();

	const loginUserId = useSelector(selectLoginUserId);

	const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

	const getChatList = useCallback(
		async (userId: string) => {
			await chatsAPI.getAllChats().then((chats) => {
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

				dispatch(setUserChats(filteredChats));
			});
		},
		[dispatch],
	);

	useEffect(() => {
		if (loginUserId) {
			usersAPI.getUser(loginUserId).then((resp) => dispatch(setUser(resp)));

			contactsAPI
				.getContactListByUser(loginUserId)
				.then((resp) => dispatch(setUserContactListId(resp)))
				.then(() => setIsUserLoading(false));

			getChatList(loginUserId);
		}
	}, [dispatch, loginUserId, getChatList]);

	return {
		isUserLoading,
		getChatList,
	};
};

export default useUser;
