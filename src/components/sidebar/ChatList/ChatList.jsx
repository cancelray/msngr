import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import ChatListElement from '../../UI/ChatListElement/ChatListElement';

import styles from './ChatList.module.css';

const Contacts = () => {
	const { users, userChats, getUsersFromChatList, setCurrentChatId } =
		useContext(MessengerContext);

	const currentChatList = getUsersFromChatList(users, userChats);

	const clickHandler = (event) => {
		const chatId = event.currentTarget.dataset.chatId;
		setCurrentChatId(chatId);
	};

	return (
		<div className={styles.chats}>
			{currentChatList?.map((chat) => (
				<ChatListElement
					chat={chat}
					key={chat.id}
					clickHandler={clickHandler}
				/>
			))}
		</div>
	);
};

export default Contacts;
