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

	const clickHandler = (event) => {
		const chatId = event.currentTarget.dataset.chatId;
		const isGroup = event.currentTarget.dataset.isGroup;

		if (chatId === currentChatId) {
			return;
		}

		setChatWithUser(null);
		setGroupChat(null);

		setCurrentChatId(chatId);

		isGroup === 'true'
			? setIsCurrentChatGroup(true)
			: setIsCurrentChatGroup(false);
	};

	return (
		<div className={styles.chats}>
			<h3>Chats</h3>
			{chatList?.map((chat) => (
				<ChatListElement
					chat={chat}
					key={chat.id}
					clickHandler={clickHandler}
				/>
			))}
		</div>
	);
};

export default ChatList;
