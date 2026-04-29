import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import styles from './Message.module.css';

const Message = (props) => {
	const { loginUserId } = useContext(MessengerContext);
	const { message } = props;

	const currentUserId = loginUserId;
	const messageCreatedDate = new Date(message.createdAt);

	const day = String(messageCreatedDate.getDate()).padStart(2, '0');
	const month = String(messageCreatedDate.getMonth() + 1).padStart(2, '0');
	const year = String(messageCreatedDate.getFullYear()).slice(-2);
	const date = `${day}.${month}.${year}`;

	const time = messageCreatedDate.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<div
			className={`
				${styles.message} 
				${String(message.senderId) === currentUserId ? styles.me : styles.other}`}
		>
			<div className={styles.messageContent}>
				<p className={styles.messageBody}>{message.content}</p>
				<p className={styles.createdAt}>{`${date} ${time}`}</p>
			</div>
		</div>
	);
};

export default Message;
