import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatWrapper from '../ChatWrapper/ChatWrapper';

import useChatContext from '../../../hooks/context/useChatContext';

import styles from './Chat.module.css';

const Chat = () => {
	const { currentChatId } = useChatContext();

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
