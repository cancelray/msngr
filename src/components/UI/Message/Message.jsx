import styles from './Message.module.css';

const Message = (props) => {
	const { message } = props;
	const currentUserId = Number(localStorage.getItem('loginUserId'));

	return (
		<div
			className={`
				${styles.message} 
				${message.senderId === currentUserId ? styles.me : styles.other}`}
		>
			<p className={styles.messageContent}>{message.content}</p>
		</div>
	);
};

export default Message;
