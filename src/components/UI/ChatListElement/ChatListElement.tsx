import { useSelector } from 'react-redux';

import type { ChatListElementProps } from '../../../types/props/ChatListElementProps.type';

import type { State } from '../../../types/store/state.type';

import styles from './ChatListElement.module.css';

const ChatListElement = (props: ChatListElementProps) => {
	const { chat, clickHandler } = props;

	const { loginUserId } = useSelector((state: State) => state.loginUserId);
	const { currentChatId } = useSelector((state: State) => state.currentChatId);

	let lastMessageTime = new Date();

	if (chat.lastMessageTime) {
		lastMessageTime = new Date(chat.lastMessageTime);
	}

	const isDateNaN = isNaN(Number(lastMessageTime));

	const day = String(lastMessageTime.getDate()).padStart(2, '0');
	const month = String(lastMessageTime.getMonth() + 1).padStart(2, '0');
	const year = String(lastMessageTime.getFullYear()).slice(-2);
	const date = `${day}.${month}.${year}`;

	return (
		<div
			className={`${styles.chatListElement} ${currentChatId === chat.chatId ? styles.currentChat : ''}`}
			onClick={clickHandler}
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
					{!chat.isGroup ? (
						<p className={styles.name}>{chat.name + ' ' + chat?.lastName}</p>
					) : (
						<p className={styles.name}>{chat.name} (group)</p>
					)}
					<p className={styles.date}>{isDateNaN ? '' : date}</p>
				</div>
				{chat.lastMessageAuthor ? (
					<div className={styles.lastMessage}>
						{chat.isGroup
							? `${
									chat.lastMessageAuthor === loginUserId
										? 'You:'
										: chat.lastMessageAuthorName
											? `${chat.lastMessageAuthorName}:`
											: ''
								} ${chat.lastMessage || ''}`
							: `${chat.lastMessageAuthor === loginUserId ? 'You' : chat.name}: ${chat.lastMessage}`}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ChatListElement;
