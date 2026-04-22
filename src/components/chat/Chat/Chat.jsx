import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatWrapper from '../ChatWrapper/ChatWrapper';

import styles from './Chat.module.css';

const Chat = () => {
	const { currentChat } = useContext(MessengerContext);

	return (
		<div className={styles.chat}>
			<ChatHeader />
			{currentChat.length > 0 ? (
				<>
					<ChatWrapper />
					<ChatForm />
				</>
			) : null}
		</div>
	);
};

export default Chat;
