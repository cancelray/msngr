import { useContext } from 'react';
import send from '../../../assets/send.svg';

import { MessengerContext } from '../../../context/MessengerContext';
import styles from './ChatForm.module.css';

const ChatForm = () => {
	const { inputChat, setInputChat, sendMessage } = useContext(MessengerContext);

	return (
		<form
			className={styles.input}
			onSubmit={sendMessage}
		>
			<textarea
				type='text'
				placeholder='Введите сообщение'
				className={styles.inputField}
				value={inputChat}
				onChange={(event) => setInputChat(event.target.value)}
			/>
			<button
				className={`${styles.button} 
										${inputChat.trim().length === 0 ? styles.blocked : ''}`}
			>
				<img
					src={send}
					alt='send'
				/>
			</button>
		</form>
	);
};

export default ChatForm;
