import { useEffect, useMemo, useState } from 'react';

import { MessengerContext } from './context/MessengerContext';

import chatsAPI from './api/chatsAPI';

import useChat from './hooks/useChat';
import useContacts from './hooks/useContacts';
import useDropdown from './hooks/useDropdown';
import useLogin from './hooks/useLogin';
import useRegister from './hooks/useRegister';
import useUser from './hooks/useUser';

import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';
import LoginPageWrapper from './components/login/LoginPageWrapper/LoginPageWrapper';

import useSearch from './hooks/useSearch';
import './styles';

function App() {
	const [messages, setMessages] = useState([]);
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
	} = useContacts(loginUserId, chatWithUser);

	const { users, user, userChats, isUserLoading } = useUser(
		messages,
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

	const {
		userNameClick,
		chatHeadNameClick,
		sidebarDropdownRef,
		chatHeadDropdownRef,
	} = useDropdown(setIsSidebarDropdownShow, setIsChatHeadDropdownShow);

	useEffect(() => {
		chatsAPI.getAllMessages().then(setMessages);
	}, []);

	const value = useMemo(
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
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,
			isLoginPageShow,
			toRegisterPage,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

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
			isChecked,
			setIsChecked,
			groupChatName,
			setGroupChatName,

			//useContacts
			userContactListId,
			setUserContactListId,
			userContactList,
			addContact,
			deleteContact,

			//useUser
			user,
			users,
			userChats,
			isUserLoading,

			//useSearch
			search,
			searchInput,
			setSearchInput,
			isSearch,
			setIsSearch,
			searchResults,

			//useDropdown
			userNameClick,
			chatHeadNameClick,
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
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,
			isLoginPageShow,
			toRegisterPage,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

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
			isChecked,
			setIsChecked,
			groupChatName,
			setGroupChatName,

			//useContacts
			userContactListId,
			setUserContactListId,
			userContactList,
			addContact,
			deleteContact,

			//useUser
			user,
			users,
			userChats,
			isUserLoading,

			//useSearch
			search,
			searchInput,
			setSearchInput,
			isSearch,
			setIsSearch,
			searchResults,

			//useDropdown
			userNameClick,
			chatHeadNameClick,
			sidebarDropdownRef,
			chatHeadDropdownRef,
		],
	);

	return (
		<MessengerContext.Provider value={value}>
			{loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />}
		</MessengerContext.Provider>
	);
}

export default App;
