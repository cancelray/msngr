import { useContext } from 'react';
import { ChatContext } from '../../../context/ChatContext';

import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatWrapper from '../ChatWrapper/ChatWrapper';

import styles from './Chat.module.css';

const Chat = () => {
	const { currentChatId } = useContext(ChatContext);

	return (
		<div className={styles.chat}>
			{currentChatId ? (
				<>
					<ChatHeader />
					<ChatWrapper />
					<ChatForm />
				</>
			) : null}
		</div>
	);
};

export default Chat;
