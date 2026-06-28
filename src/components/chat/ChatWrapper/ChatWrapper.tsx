import { useSelector } from 'react-redux';

import Message from '../../UI/Message/Message';

import useChatContext from '../../../hooks/context/useChatContext';
import useMessengerContext from '../../../hooks/context/useMessengerContext';

import type { State } from '../../../types/store/state.type';

import styles from './ChatWrapper.module.css';

const ChatWrapper = () => {
	const loginUserId = useSelector(
		(state: State) => state.loginUserId?.loginUserId,
	);

	const { users } = useMessengerContext();
	const { currentChat, chatWrapperRef, endOfMessagesRef, isCurrentChatGroup } =
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
