import React, { useCallback, useState } from 'react';

import type { ChatListItem } from '../types/Chat.type';
import type { Contact } from '../types/Contact.type';
import type { User } from '../types/User.type';

const useSearch = (
	chatList: ChatListItem[],
	userContactList: User[],
	users: User[],
	newChatId: string | null,
	currentChatId: string | null,
	setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
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
				setCurrentChatId(null);
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
		[
			users,
			chatList,
			userContactList,
			newChatId,
			currentChatId,
			setCurrentChatId,
		],
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
