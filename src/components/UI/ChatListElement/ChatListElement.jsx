import styles from './ChatListElement.module.css';

const ChatListElement = (props) => {
	const { chat, clickHandler } = props;

	return (
		<div
			className={styles.chatListElement}
			onClick={clickHandler}
			data-chat-id={chat.chatId}
		>
			<img
				className={styles.avatar}
				src={chat.avatar}
				alt='avatar'
			></img>
			<div className={styles.contactInfo}>
				<div className={styles.name}>{chat.name + ' ' + chat.lastName}</div>
				<div className={styles.lastMessage}>Последнее сообщение...</div>
			</div>
		</div>
	);
};

export default ChatListElement;
