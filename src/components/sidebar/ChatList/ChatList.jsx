import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import ChatListElement from '../../UI/ChatListElement/ChatListElement';

import styles from './ChatList.module.css';

const ChatList = () => {
	const {
		currentChatId,
		setCurrentChatId,
		chatList,
		setisCurrentChatGroup,
		setChatWithUser,
		setGroupChat,
	} = useContext(MessengerContext);

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
			? setisCurrentChatGroup(true)
			: setisCurrentChatGroup(false);
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
