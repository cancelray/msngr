import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import Message from '../../UI/Message/Message';

import styles from './ChatWrapper.module.css';

const ChatWrapper = () => {
	const { currentChat, chatWrapperRef, endOfMessagesRef } =
		useContext(MessengerContext);

	return (
		<div
			className={styles.chatWrapper}
			ref={chatWrapperRef}
		>
			{currentChat.map((message) => (
				<Message
					message={message}
					key={message.id ? message.id : crypto.randomUUID()}
				/>
			))}
			<div ref={endOfMessagesRef} />
		</div>
	);
};

export default ChatWrapper;
