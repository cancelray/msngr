import { useSelector } from 'react-redux';

import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatWrapper from '../ChatWrapper/ChatWrapper';

import type { State } from '../../../types/store/state.type';

import styles from './Chat.module.css';

const Chat = () => {
	const { currentChatId } = useSelector((state: State) => state.currentChatId);

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
