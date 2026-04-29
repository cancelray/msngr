import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import ChatListElement from '../../UI/ChatListElement/ChatListElement';

import styles from './ChatList.module.css';

const ChatList = () => {
	const { setCurrentChatId, chatList } = useContext(MessengerContext);

	const clickHandler = (event) => {
		const chatId = event.currentTarget.dataset.chatId;
		setCurrentChatId(chatId);
	};

	return (
		<div className={styles.chats}>
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
