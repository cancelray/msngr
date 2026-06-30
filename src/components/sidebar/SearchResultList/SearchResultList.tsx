import { useDispatch, useSelector } from 'react-redux';

import SearchResultListElement from '../../UI/SearchResultListElement/SearchResultListElement';

import useChatContext from '../../../hooks/context/useChatContext';
import useMessengerContext from '../../../hooks/context/useMessengerContext';
import useUIContext from '../../../hooks/context/useUIContext';

import type { State } from '../../../types/store/state.type';

import {
	closeChat,
	setCurrentChatId,
} from '../../../store/chat/currentChatId.slice';

import styles from './searchResultList.module.css';

const SearchResultList = () => {
	const dispatch = useDispatch();

	const { currentChatId } = useSelector((state: State) => state.currentChatId);
	const { chatList } = useSelector((state: State) => state.chatList);

	const { setIsContactListShow } = useMessengerContext();
	const { setChatWithUser, setGroupChat } = useChatContext();
	const { searchResults, setSearchInput, setIsSearch, createNewChat } =
		useUIContext();

	const searchResultListClickHandler = (
		event: React.MouseEvent<HTMLElement>,
	) => {
		setSearchInput('');

		const chatId = event.currentTarget.dataset.chatId;

		if (currentChatId === chatId) {
			setIsSearch(false);
			return;
		}

		if (chatId) {
			dispatch(setCurrentChatId(chatId));
		} else {
			dispatch(closeChat());

			const userId = event.currentTarget.dataset.userId;

			if (userId) {
				createNewChat(userId);
			}
		}

		setIsSearch(false);
		setIsContactListShow(false);

		setChatWithUser(null);
		setGroupChat(null);
	};

	return (
		<div className={styles.searchResults}>
			{searchResults?.map((searchResult) => (
				<SearchResultListElement
					searchResult={searchResult}
					key={searchResult.id}
					dataChatId={
						chatList?.find((chat) =>
							chat.isGroup
								? chat.name === searchResult.name
								: chat.login === searchResult.login,
						)?.chatId
					}
					searchResultListClickHandler={searchResultListClickHandler}
				/>
			))}
		</div>
	);
};

export default SearchResultList;
