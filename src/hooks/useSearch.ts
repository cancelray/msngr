import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	closeChat,
	selectCurrentChatId,
} from '../store/chat/currentChatId.slice';
import { selectChatList } from '../store/chatList/chatList.slice';
import { selectUserContactList } from '../store/userContactList/userContactListId.slice';
import { selectUsers } from '../store/users/users.slice';

import type { ChatListItem } from '../types/Chat.type';
import type { Contact } from '../types/Contact.type';
import type { User } from '../types/User.type';

const useSearch = (newChatId: string | null) => {
	const dispatch = useDispatch();

	const users = useSelector(selectUsers);
	const currentChatId = useSelector(selectCurrentChatId);
	const chatList = useSelector(selectChatList);
	const userContactList = useSelector(selectUserContactList);

	const [searchInput, setSearchInput] = useState('');
	const [isSearch, setIsSearch] = useState(false);
	const [searchResults, setSearchResults] = useState<
		(ChatListItem | Contact | User)[]
	>([]);

	const search = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const searchInput = event.target.value.trim();
			setIsSearch(searchInput.length > 0);

			if (searchInput.length > 0 && currentChatId === newChatId) {
				dispatch(closeChat());
			}

			const searchByChats = chatList.filter(
				(chat) =>
					chat.name.toLowerCase().includes(searchInput.toLowerCase()) ||
					chat.lastName?.toLowerCase().includes(searchInput.toLowerCase()) ||
					chat.login?.toLowerCase().includes(searchInput.toLowerCase()),
			);

			const searchByContacts = userContactList.filter(
				(contact) =>
					contact.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
					contact.lastName?.toLowerCase().includes(searchInput.toLowerCase()) ||
					contact.login?.toLowerCase().includes(searchInput.toLowerCase()),
			);

			const searchResult = [...searchByChats, ...searchByContacts];
			const uniqueSearchResults = [
				...new Map(searchResult.map((result) => [result.id, result])).values(),
			];

			if (uniqueSearchResults.length === 0) {
				const searchInUsers = users.filter(
					(user) =>
						user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
						user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
						user.login.toLowerCase().includes(searchInput.toLowerCase()),
				);

				setSearchResults(searchInUsers);
			} else {
				setSearchResults(uniqueSearchResults);
			}
		},
		[dispatch, users, chatList, userContactList, newChatId, currentChatId],
	);

	return {
		search,
		searchInput,
		setSearchInput,
		isSearch,
		setIsSearch,
		searchResults,
	};
};

export default useSearch;
