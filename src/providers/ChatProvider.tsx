import { useMemo } from 'react';

import useChat from '../hooks/useChat';
import useChatList from '../hooks/useChatList';
import useContacts from '../hooks/useContacts';

import useAuthContext from '../hooks/context/useAuthContext';

import { ChatContext } from '../context/ChatContext';

import type { ChildrenProps } from '../types/props/ChildrenProps.type';

const ChatProvider = ({ children }: ChildrenProps) => {
	const {
		getChatList,
	} = useAuthContext();

	const {
		newChatId,
		setNewChatId,
		getUsersFromChatList,
	} = useChatList(getChatList);

	const {
		chatWithUser,
		setChatWithUser,
		groupChat,
		setGroupChat,
		sendMessage,
		chatWrapperRef,
		endOfMessagesRef,
		deleteChat,
		isCurrentChatGroup,
		setIsCurrentChatGroup,
		setIsNewChatGroup,
	} = useChat(
		newChatId,
		setNewChatId,
		getChatList,
		getUsersFromChatList,
	);

	const { addContact, deleteContact } = useContacts(
		chatWithUser,
	);

	const value = useMemo(
		() => ({
			//useChatList
			newChatId,
			setNewChatId,

			//useChat
			chatWithUser,
			setChatWithUser,
			groupChat,
			setGroupChat,
			sendMessage,
			chatWrapperRef,
			endOfMessagesRef,
			deleteChat,
			isCurrentChatGroup,
			setIsCurrentChatGroup,
			setIsNewChatGroup,

			//useContacts
			addContact,
			deleteContact,
		}),
		[
			//useChatList
			newChatId,
			setNewChatId,

			//useChat
			chatWithUser,
			setChatWithUser,
			groupChat,
			setGroupChat,
			sendMessage,
			chatWrapperRef,
			endOfMessagesRef,
			deleteChat,
			isCurrentChatGroup,
			setIsCurrentChatGroup,
			setIsNewChatGroup,

			//useContacts
			addContact,
			deleteContact,
		],
	);

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
