import { useContext } from 'react';

import { ChatContext } from '../../../context/ChatContext';

import ChatListElement from '../../UI/ChatListElement/ChatListElement';

import styles from './ChatList.module.css';

const ChatList = () => {
	const {
		currentChatId,
		setCurrentChatId,
		chatList,
		setIsCurrentChatGroup,
		setChatWithUser,
		setGroupChat,
	} = useContext(ChatContext);

	const clickHandler = (chatId, isGroup) => {
		if (chatId === currentChatId) {
			return;
		}

		setChatWithUser(null);
		setGroupChat(null);

		setCurrentChatId(chatId);

		isGroup ? setIsCurrentChatGroup(true) : setIsCurrentChatGroup(false);
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
