import { useEffect, useState } from 'react';

const useSearch = (chatList, userContactList, users) => {
	const [searchInput, setSearchInput] = useState('');
	const [isSearch, setIsSearch] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		setIsSearch(searchInput.trim().length > 0);

		const searchByChats = chatList.filter(
			(chat) =>
				chat.name.toLowerCase().includes(searchInput.toLowerCase()) ||
				chat.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
				chat.login.toLowerCase().includes(searchInput.toLowerCase()),
		);

		const saerchByContacts = userContactList.filter(
			(contact) =>
				contact.name.toLowerCase().includes(searchInput.toLowerCase()) ||
				contact.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
				contact.login.toLowerCase().includes(searchInput.toLowerCase()),
		);

		const searchResult = [...searchByChats, ...saerchByContacts];
		const uniquSearchResults = [
			...new Map(searchResult.map((result) => [result.id, result])).values(),
		];

		if (uniquSearchResults.length === 0) {
			const searchInUsers = users.filter(
				(user) =>
					user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
					user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
					user.login.toLowerCase().includes(searchInput.toLowerCase()),
			);

			setSearchResults(searchInUsers);
		} else {
			setSearchResults(uniquSearchResults);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchInput]);

	return { searchInput, setSearchInput, isSearch, setIsSearch, searchResults };
};

export default useSearch;
