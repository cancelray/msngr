import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';
import styles from './ChatHeader.module.css';

const ChatHeader = () => {
	const { chatWithUser } = useContext(MessengerContext);

	if (chatWithUser) {
		return (
			<div className={styles.chatHeader}>
				<img
					src={chatWithUser.avatar}
					alt='avatar'
					className={styles.avatar}
				></img>
				<div>{chatWithUser.name + ' ' + chatWithUser.lastName}</div>
			</div>
		);
	}

	return null;
};

export default ChatHeader;
