import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import styles from './ChatListElement.module.css';

const ChatListElement = (props) => {
	const { chat, clickHandler } = props;
	const { currentChatId, loginUserId } = useContext(MessengerContext);

	const lastMessageTime = new Date(chat.lastMessageTime);
	const day = String(lastMessageTime.getDate()).padStart(2, '0');
	const month = String(lastMessageTime.getMonth() + 1).padStart(2, '0');
	const year = String(lastMessageTime.getFullYear()).slice(-2);
	const date = `${day}.${month}.${year}`;

	return (
		<div
			className={`${styles.chatListElement} ${currentChatId === chat.chatId ? styles.currentChat : ''}`}
			onClick={clickHandler}
			data-chat-id={chat.chatId}
		>
			{chat.avatar?.length > 0 ? (
				<img
					className={styles.avatar}
					src={chat.avatar}
					alt='avatar'
				></img>
			) : (
				<div className={styles.avatarAlt}>{chat.name ? chat.name[0] : ''}</div>
			)}

			<div className={styles.contactInfo}>
				<div className={styles.contactHead}>
					<p className={styles.name}>{chat.name + ' ' + chat.lastName}</p>
					<p className={styles.date}>{date}</p>
				</div>
				<div
					className={styles.lastMessage}
				>{`${chat.lastMessageAuthor === loginUserId ? 'You' : chat.name}: ${chat.lastMessage}`}</div>
			</div>
		</div>
	);
};

export default ChatListElement;
