import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';
import { MessengerContext } from '../../../context/MessengerContext';

import Message from '../../UI/Message/Message';

import styles from './ChatWrapper.module.css';

const ChatWrapper = () => {
	const { loginUserId } = useContext(AuthContext);
	const { users } = useContext(MessengerContext);
	const { currentChat, chatWrapperRef, endOfMessagesRef, isCurrentChatGroup } =
		useContext(ChatContext);

	return (
		<div
			className={styles.chatWrapper}
			ref={chatWrapperRef}
		>
			{currentChat?.map((message) => (
				<Message
					message={message}
					messageAuthor={users?.find(
						(user) => user.id === message.senderId && user.id !== loginUserId,
					)}
					isShowAuthorName={
						isCurrentChatGroup && String(message.senderId) !== loginUserId
					}
					loginUserId={loginUserId}
					key={message.id ? message.id : crypto.randomUUID()}
				/>
			))}
			<div ref={endOfMessagesRef} />
		</div>
	);
};

export default ChatWrapper;
