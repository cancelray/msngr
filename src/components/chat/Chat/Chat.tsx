import { useSelector } from 'react-redux';

import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatWrapper from '../ChatWrapper/ChatWrapper';

import { selectCurrentChatId } from '../../../store/chat/currentChatId.slice';

import styles from './Chat.module.css';

const Chat = () => {
	const currentChatId = useSelector(selectCurrentChatId);

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
