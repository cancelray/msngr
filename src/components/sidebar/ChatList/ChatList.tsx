import { useDispatch, useSelector } from 'react-redux';

import ChatListElement from '../../UI/ChatListElement/ChatListElement';

import useChatContext from '../../../hooks/context/useChatContext';

import { setCurrentChatId } from '../../../store/chat/currentChatId.slice';

import type { State } from '../../../types/store/state.type';

import styles from './ChatList.module.css';

const ChatList = () => {
	const { setIsCurrentChatGroup, setChatWithUser, setGroupChat } =
		useChatContext();

	const dispatch = useDispatch();

	const { currentChatId } = useSelector((state: State) => state.currentChatId);
	const { chatList } = useSelector((state: State) => state.chatList);

	const clickHandler = (
		chatId: string | null | undefined,
		isGroup: boolean,
	) => {
		if (chatId === currentChatId) {
			return;
		}

		setChatWithUser(null);
		setGroupChat(null);

		if (chatId) {
			dispatch(setCurrentChatId(chatId));
		}

		setIsCurrentChatGroup(isGroup);
	};

	return (
		<div className={styles.chats}>
			<h3>Chats</h3>
			{chatList?.map((chat) => (
				<ChatListElement
					chat={chat}
					key={chat.id}
					clickHandler={() => clickHandler(chat.chatId, chat.isGroup)}
				/>
			))}
		</div>
	);
};

export default ChatList;
