import { useContext, useMemo } from 'react';

import useChat from '../hooks/useChat';
import useChatList from '../hooks/useChatList';
import useContacts from '../hooks/useContacts';
// import useCreateChat from '../hooks/useCreateChat';
import useUser from '../hooks/useUser';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { MessengerContext } from '../context/MessengerContext';

const ChatProvider = ({ children }) => {
	const {
		messages,
		setMessages,
		users,
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
	} = useContext(MessengerContext);
	const { loginUserId, getChatList } = useContext(AuthContext);

	const { userContactListId, setUserContactListId } = useUser(
		loginUserId,
		getChatList,
	);

	const {
		chatList,
		setChatList,
		userChats,
		setUserChats,
		newChatId,
		setNewChatId,
		getUsersFromChatList,
	} = useChatList(messages, users, loginUserId);

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
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		chatList,
		setChatList,
		userChats,
		setUserChats,
		newChatId,
		setNewChatId,
		getChatList,
		getUsersFromChatList,
	);

	// const { createNewChat, createGroupChat, groupChatName, setGroupChatName } =
	// 	useCreateChat(
	// 		loginUserId,
	// 		setIsNewChatGroup,
	// 		isContactListShow,
	// 		setIsContactListShow,
	// 		setCurrentChatId,
	// 		setIsCreateGroupChatShow,
	// 		setNewChatId,
	// 		setIsCurrentChatGroup,
	// 	);

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

			//useCreateChat
			// createNewChat,
			// createGroupChat,
			// groupChatName,
			// setGroupChatName,

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

			//useCreateChat
			// createNewChat,
			// createGroupChat,
			// groupChatName,
			// setGroupChatName,

			//useContacts
			userContactList,
			addContact,
			deleteContact,
		],
	);

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
