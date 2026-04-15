import styles from './ChatListElement.module.css';

const Contact = (props) => {
	const { contact } = props;

	return (
		<div className={styles.chatListElement}>
			<img
				className={styles.avatar}
				src={contact.avatar}
				alt='avatar'
			></img>
			<div className={styles.contactInfo}>
				<div className={styles.name}>
					{contact.name + ' ' + contact.lastName}
				</div>
				<div className={styles.lastMessage}>Последнее сообщение...</div>
			</div>
		</div>
	);
};

export default Contact;
