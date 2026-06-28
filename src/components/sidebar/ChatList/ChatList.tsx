import ChatListElement from '../../UI/ChatListElement/ChatListElement';

import useChatContext from '../../../hooks/context/useChatContext';

import styles from './ChatList.module.css';

const ChatList = () => {
	const {
		currentChatId,
		setCurrentChatId,
		chatList,
		setIsCurrentChatGroup,
		setChatWithUser,
		setGroupChat,
	} = useChatContext();

	const clickHandler = (
		chatId: string | null | undefined,
		isGroup: boolean,
	) => {
		if (chatId === currentChatId) {
			return;
		}

		setChatWithUser(null);
		setGroupChat(null);

		if (chatId) {
			setCurrentChatId(chatId);
		}
		
		setIsCurrentChatGroup(isGroup);
	};

	return (
		<div className={styles.chats}>
			<h3>Chats</h3>
			{chatList?.map((chat) => (
				<ChatListElement
					chat={chat}
					key={chat.id}
					clickHandler={() => clickHandler(chat.chatId, chat.isGroup)}
				/>
			))}
		</div>
	);
};

export default ChatList;
