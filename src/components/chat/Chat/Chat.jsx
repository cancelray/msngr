import ChatHeader from '../ChatHeader/ChatHeader';

import send from '../../../assets/send.svg';

import styles from './Chat.module.css';

const Chat = () => {
	return (
		<div className={styles.chat}>
			<ChatHeader />

			<div className={styles.messages}>
				<div className={`${styles.message} ${styles.other}`}>
					<p className={styles.messageContent}>Привет!</p>
				</div>
				<div className={`${styles.message} ${styles.me}`}>
					<p className={styles.messageContent}>Привет 👋</p>
				</div>
				<div className={`${styles.message} ${styles.other}`}>
					<p className={styles.messageContent}>Как дела?</p>
				</div>
			</div>

			<form className={styles.input}>
				<textarea
					type='text'
					placeholder='Введите сообщение'
					className={styles.inputField}
				/>
				<button className={styles.button}>
					<img
						src={send}
						alt='send'
					/>
				</button>
			</form>
		</div>
	);
};

export default Chat;
