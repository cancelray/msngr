import { useContext, useState } from 'react';

import send from '../../../assets/send.svg';

import { MessengerContext } from '../../../context/MessengerContext';

import styles from './ChatForm.module.css';

const ChatForm = () => {
	const [inputChat, setInputChat] = useState('');

	const { sendMessage } = useContext(MessengerContext);

	const trimmedInput = inputChat.trim();

	const onSubmit = (event) => {
		event.preventDefault();

		if (trimmedInput) {
			sendMessage(trimmedInput, () => setInputChat(''));
		}
	};

	return (
		<form
			className={styles.input}
			onSubmit={onSubmit}
		>
			<textarea
				id='input-field'
				className={styles.inputField}
				placeholder='Введите сообщение'
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
