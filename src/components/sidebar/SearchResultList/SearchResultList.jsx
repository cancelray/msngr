import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import SearchResultListElement from '../../UI/SearchResultListElement/SearchResultListElement';

import styles from './searchResultList.module.css';

const SearchResultList = () => {
	const {
		searchResults,
		setSearchInput,
		setIsSearch,
		userChats,
		setCurrentChatId,
		createNewChat,
	} = useContext(MessengerContext);

	const searchResultListClickHandler = (event) => {
		setSearchInput('');
		const chatId = event.currentTarget.dataset.chatId;

		if (chatId) {
			setIsSearch(false);
			setCurrentChatId(chatId);
		} else {
			const userId = event.currentTarget.dataset.userId;
			createNewChat(userId);
		}
	};

	return (
		<div className={styles.searchResults}>
			{searchResults?.map((searchResult) => (
				<SearchResultListElement
					searchResult={searchResult}
					key={searchResult.id}
					dataChatId={
						userChats?.find((chat) => chat.membersId.includes(searchResult.id))
							?.id
					}
					searchResultListClickHandler={searchResultListClickHandler}
				/>
			))}
		</div>
	);
};

export default SearchResultList;
