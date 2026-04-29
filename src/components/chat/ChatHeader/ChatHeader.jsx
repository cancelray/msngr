import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';
import styles from './ChatHeader.module.css';

const ChatHeader = () => {
	const { chatWithUser } = useContext(MessengerContext);

	if (chatWithUser) {
		return (
			<div className={styles.chatHeader}>
				{chatWithUser.avatar.length > 0 ? (
					<img
						className={styles.avatar}
						src={chatWithUser.avatar}
						alt='avatar'
					></img>
				) : (
					<div className={styles.avatarAlt}>
						{chatWithUser.name ? chatWithUser?.name[0] : ''}
					</div>
				)}
				<div>{chatWithUser.name + ' ' + chatWithUser.lastName}</div>
			</div>
		);
	}
};

export default ChatHeader;
