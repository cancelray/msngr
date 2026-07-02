import { useDispatch, useSelector } from 'react-redux';

import ChatListElement from '../../UI/ChatListElement/ChatListElement';

import useChatContext from '../../../hooks/context/useChatContext';

import {
	selectCurrentChatId,
	setCurrentChatId,
} from '../../../store/chat/currentChatId.slice';

import { selectChatList } from '../../../store/chatList/chatList.slice';
import styles from './ChatList.module.css';

const ChatList = () => {
	const dispatch = useDispatch();

	const currentChatId = useSelector(selectCurrentChatId);
	const chatList = useSelector(selectChatList);

	const { setIsCurrentChatGroup, setChatWithUser, setGroupChat } =
		useChatContext();

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
