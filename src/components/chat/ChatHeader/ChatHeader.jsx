import styles from './ChatHeader.module.css';

const ChatHeader = () => {
	return (
		<div className={styles.chatHeader}>
			<div className={styles.avatar}></div>
			<div>Алексей</div>
		</div>
	);
};

export default ChatHeader;
