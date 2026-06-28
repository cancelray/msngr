import { useMemo } from 'react';

import useChat from '../hooks/useChat';
import useChatList from '../hooks/useChatList';
import useContacts from '../hooks/useContacts';

import useAuthContext from '../hooks/context/useAuthContext';
import useMessengerContext from '../hooks/context/useMessengerContext';

import { ChatContext } from '../context/ChatContext';

import type { ChildrenProps } from '../types/props/ChildrenProps.type';

const ChatProvider = ({ children }: ChildrenProps) => {
	const { messages, setMessages, users } = useMessengerContext();

	const {
		loginUserId,
		userContactListId,
		setUserContactListId,
		getChatList,
		userChats,
		setUserChats,
	} = useAuthContext();

	const {
		chatList,
		setChatList,
		newChatId,
		setNewChatId,
		getUsersFromChatList,
	} = useChatList(messages, users, loginUserId, userChats, getChatList);

	const {
		setCurrentChatId,
		chatWithUser,
		setChatWithUser,
		groupChat,
		setGroupChat,
		currentChatId,
		currentChat,
		sendMessage,
		chatWrapperRef,
		endOfMessagesRef,
		deleteChat,
		isCurrentChatGroup,
		setIsCurrentChatGroup,
		setIsNewChatGroup,
	} = useChat(
		messages,
		setMessages,
		users,
		loginUserId,
		chatList,
		setChatList,
		userChats,
		newChatId,
		setNewChatId,
		getChatList,
		getUsersFromChatList,
	);

	const { userContactList, addContact, deleteContact } = useContacts(
		loginUserId,
		users,
		userContactListId,
		setUserContactListId,
		chatWithUser,
	);

	const value = useMemo(
		() => ({
			//useChatList
			chatList,
			setChatList,
			userChats,
			setUserChats,
			newChatId,
			setNewChatId,

			//useChat
			setCurrentChatId,
			chatWithUser,
			setChatWithUser,
			groupChat,
			setGroupChat,
			currentChatId,
			currentChat,
			sendMessage,
			chatWrapperRef,
			endOfMessagesRef,
			deleteChat,
			isCurrentChatGroup,
			setIsCurrentChatGroup,
			setIsNewChatGroup,

			//useContacts
			userContactList,
			addContact,
			deleteContact,
		}),
		[
			//useChatList
			chatList,
			setChatList,
			userChats,
			setUserChats,
			newChatId,
			setNewChatId,

			//useChat
			setCurrentChatId,
			chatWithUser,
			setChatWithUser,
			groupChat,
			setGroupChat,
			currentChatId,
			currentChat,
			sendMessage,
			chatWrapperRef,
			endOfMessagesRef,
			deleteChat,
			isCurrentChatGroup,
			setIsCurrentChatGroup,
			setIsNewChatGroup,

			//useContacts
			userContactList,
			addContact,
			deleteContact,
		],
	);

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
