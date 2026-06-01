import { useEffect, useMemo, useState } from 'react';

import chatsAPI from './api/chatsAPI';

import useChat from './hooks/useChat';
import useContacts from './hooks/useContacts';
import useDropdown from './hooks/useDropdown';
import useLogin from './hooks/useLogin';
import useRegister from './hooks/useRegister';
import useSearch from './hooks/useSearch';
import useUser from './hooks/useUser';

import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';
import LoginPageWrapper from './components/login/LoginPageWrapper/LoginPageWrapper';

import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';
import { UIContext } from './context/UIContext';

const AppProviders = () => {
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	const [isContactListShow, setIsContactListShow] = useState(false);
	const [isCreateGroupChatShow, setIsCreateGroupChatShow] = useState(false);
	const [isSidebarDropdownShow, setIsSidebarDropdownShow] = useState(false);
	const [isChatHeadDropdownShow, setIsChatHeadDropdownShow] = useState(false);

	const {
		loginUserId,
		setLoginUserId,
		loginSubmit,
		loginErrors,
		isLoginPageShow,
		toRegisterPage,
		setIsLoginPageShow,
	} = useLogin();

	const { registerSubmit, registerErrors } = useRegister(setIsLoginPageShow);

	const {
		chatList,
		setChatList,
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
		createNewChat,
		newChatId,
		setNewChatId,
		deleteChat,
		isCurrentChatGroup,
		setIsCurrentChatGroup,
		createGroupChat,
		isChecked,
		setIsChecked,
		groupChatName,
		setGroupChatName,
	} = useChat(
		messages,
		setMessages,
		loginUserId,
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
	);

	const {
		userContactListId,
		setUserContactListId,
		userContactList,
		addContact,
		deleteContact,
	} = useContacts(loginUserId, users, chatWithUser);

	const { user, userChats, isUserLoading } = useUser(
		messages,
		users,
		setUsers,
		chatList,
		setChatList,
		loginUserId,
		setUserContactListId,
		newChatId,
		setNewChatId,
		currentChatId,
		isCurrentChatGroup,
	);

	const {
		search,
		searchInput,
		setSearchInput,
		isSearch,
		setIsSearch,
		searchResults,
	} = useSearch(
		chatList,
		userContactList,
		users,
		newChatId,
		currentChatId,
		setCurrentChatId,
	);

	const { sidebarDropdownRef, chatHeadDropdownRef } = useDropdown(
		setIsSidebarDropdownShow,
		setIsChatHeadDropdownShow,
	);

	useEffect(() => {
		chatsAPI.getAllMessages().then(setMessages);
	}, []);

	const authValue = useMemo(
		() => ({
			//useLogin
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,

			//useRegister
			registerSubmit,
			registerErrors,

			//useUser
			user,
			isUserLoading,
		}),
		[
			//useLogin
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,

			//useRegister
			registerSubmit,
			registerErrors,

			//useUser
			user,
			isUserLoading,
		],
	);

	const chatValue = useMemo(
		() => ({
			users,

			//useChat
			chatList,
			setChatList,
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
			createNewChat,
			newChatId,
			setNewChatId,
			deleteChat,
			isCurrentChatGroup,
			setIsCurrentChatGroup,
			createGroupChat,
			groupChatName,
			setGroupChatName,

			//useContacts
			userContactListId,
			setUserContactListId,
			userContactList,
			addContact,
			deleteContact,

			//useUser
			userChats,
		}),
		[
			users,

			//useChat
			chatList,
			setChatList,
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
			createNewChat,
			newChatId,
			setNewChatId,
			deleteChat,
			isCurrentChatGroup,
			setIsCurrentChatGroup,
			createGroupChat,
			groupChatName,
			setGroupChatName,

			//useContacts
			userContactListId,
			setUserContactListId,
			userContactList,
			addContact,
			deleteContact,

			//useUser
			userChats,
		],
	);

	const UIValue = useMemo(
		() => ({
			isContactListShow,
			setIsContactListShow,
			isSidebarDropdownShow,
			setIsSidebarDropdownShow,
			isChatHeadDropdownShow,
			setIsChatHeadDropdownShow,
			isCreateGroupChatShow,
			setIsCreateGroupChatShow,

			//useLogin
			isLoginPageShow,
			setIsLoginPageShow,
			toRegisterPage,

			//useChat
			isChecked,
			setIsChecked,

			//useSearch
			search,
			searchInput,
			setSearchInput,
			isSearch,
			setIsSearch,
			searchResults,

			//useDropdown
			sidebarDropdownRef,
			chatHeadDropdownRef,
		}),
		[
			isContactListShow,
			setIsContactListShow,
			isSidebarDropdownShow,
			setIsSidebarDropdownShow,
			isChatHeadDropdownShow,
			setIsChatHeadDropdownShow,
			isCreateGroupChatShow,
			setIsCreateGroupChatShow,

			//useLogin
			isLoginPageShow,
			setIsLoginPageShow,
			toRegisterPage,

			//useChat
			isChecked,
			setIsChecked,

			//useSearch
			search,
			searchInput,
			setSearchInput,
			isSearch,
			setIsSearch,
			searchResults,

			//useDropdown
			sidebarDropdownRef,
			chatHeadDropdownRef,
		],
	);

	return (
		<AuthContext.Provider value={authValue}>
			<ChatContext.Provider value={chatValue}>
				<UIContext.Provider value={UIValue}>
					{loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />}
				</UIContext.Provider>
			</ChatContext.Provider>
		</AuthContext.Provider>
	);
};

export default AppProviders;
