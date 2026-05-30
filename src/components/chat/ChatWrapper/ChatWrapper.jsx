import { useContext } from 'react';

import { ChatContext } from '../../../context/ChatContext';

import Message from '../../UI/Message/Message';

import styles from './ChatWrapper.module.css';

const ChatWrapper = () => {
	const { currentChat, chatWrapperRef, endOfMessagesRef, isCurrentChatGroup } =
		useContext(ChatContext);

	return (
		<div
			className={styles.chatWrapper}
			ref={chatWrapperRef}
		>
			{currentChat.map((message) => (
				<Message
					message={message}
					isCurrentChatGroup={isCurrentChatGroup}
					key={message.id ? message.id : crypto.randomUUID()}
				/>
			))}
			<div ref={endOfMessagesRef} />
		</div>
	);
};

export default ChatWrapper;
