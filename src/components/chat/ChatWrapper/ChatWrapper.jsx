import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import Message from '../../UI/Message/Message';

import styles from './ChatWrapper.module.css';

const ChatWrapper = () => {
	const { currentChat } = useContext(MessengerContext);

	return (
		<div className={styles.chatWrapper}>
			{currentChat.map((message) => (
				<Message message={message} key={message.id} />
			))}
		</div>
	);
};

export default ChatWrapper;
