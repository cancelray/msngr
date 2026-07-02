import { useSelector } from 'react-redux';

import Message from '../../UI/Message/Message';

import useChatContext from '../../../hooks/context/useChatContext';

import { selectLoginUserId } from '../../../store/auth/loginUserId.slice';
import { selectCurrentChat } from '../../../store/chat/currentChat.slice';
import { selectUsers } from '../../../store/users/users.slice';

import styles from './ChatWrapper.module.css';

const ChatWrapper = () => {
	const users = useSelector(selectUsers);
	const loginUserId = useSelector(selectLoginUserId);
	const currentChat = useSelector(selectCurrentChat);

	const { chatWrapperRef, endOfMessagesRef, isCurrentChatGroup } =
		useChatContext();

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
					key={message.id}
				/>
			))}
			<div ref={endOfMessagesRef} />
		</div>
	);
};

export default ChatWrapper;
