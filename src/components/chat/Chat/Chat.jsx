import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import ChatHeader from '../ChatHeader/ChatHeader';
import ChatWrapper from '../ChatWrapper/ChatWrapper';

import send from '../../../assets/send.svg';

import styles from './Chat.module.css';

const Chat = () => {
	const { currentChat } = useContext(MessengerContext);

	return (
		<div className={styles.chat}>
			<ChatHeader />

			{currentChat.length > 0 ? (
				<>
					<ChatWrapper />
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
				</>
			) : null}
		</div>
	);
};

export default Chat;
