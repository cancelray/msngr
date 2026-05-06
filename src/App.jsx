import { useState } from 'react';

import { MessengerContext } from './context/MessengerContext';

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
	const [isContactListShow, setIsContactListShow] = useState(false);
	const [isSidebarDropdownShow, setIsSidebarDropdownShow] = useState(false);
	const [isChatheadDropdownShow, setIsChatheadDropdownShow] = useState(false);

	const {
		loginUserId,
		setLoginUserId,
		loginInput,
		setLoginInput,
		passwordInput,
		setPasswordInput,
		loginSubmit,
		loginErrors,
		isLoginPageShow,
		toRegisterPage,
		setIsLoginPageShow,
	} = useLogin();

	const {
		newLogin,
		setNewLogin,
		newPassword,
		setNewPassword,
		newPasswordRepeat,
		setNewPasswordRepeat,
		newName,
		setNewName,
		newSecondName,
		setNewSecondName,
		registerSubmit,
		registerErrors,
	} = useRegister(setIsLoginPageShow);

	const {
		setCurrentChatId,
		chatWithUser,
		setChatWithUser,
		groupChat,
		setGroupChat,
		currentChatId,
		currentChat,
		inputChat,
		setInputChat,
		sendMessage,
		messages,
		chatWrapperRef,
		endOfMessagesRef,
		createNewChat,
		showChats,
		newChatId,
		setNewChatId,
		deleteChat,
		isCurrentChatGroup,
		setisCurrentChatGroup,
	} = useChat(
		loginUserId,
		isContactListShow,
		setIsContactListShow,
		setIsSidebarDropdownShow,
		setIsChatheadDropdownShow,
	);

	const {
		userContactListId,
		setUserContactListId,
		userContactList,
		showContacts,
		addContact,
		deleteContact,
	} = useContacts(
		loginUserId,
		chatWithUser,
		setCurrentChatId,
		setIsSidebarDropdownShow,
		isContactListShow,
		setIsContactListShow,
	);

	const { users, user, userChats, chatList, isUserLoading } = useUser(
		messages,
		loginUserId,
		setUserContactListId,
		newChatId,
		setNewChatId,
		currentChatId,
	);

	const { searchInput, setSearchInput, isSearch, setIsSearch, searchResults } =
		useSearch(chatList, userContactList, users);

	const {
		userNameClick,
		chatheadNameClick,
		sidebarDropdownRef,
		chatheadDropdownRef,
		logout,
	} = useDropdown(
		setIsSidebarDropdownShow,
		setIsChatheadDropdownShow,
		setLoginUserId,
		setCurrentChatId,
	);

	return (
		<MessengerContext.Provider
			value={{
				isContactListShow,
				setIsContactListShow,
				isSidebarDropdownShow,
				isChatheadDropdownShow,

				//useLogin
				loginUserId,
				setLoginUserId,
				loginInput,
				setLoginInput,
				passwordInput,
				setPasswordInput,
				loginSubmit,
				loginErrors,
				isLoginPageShow,
				toRegisterPage,
				setIsLoginPageShow,

				//useRegister
				newLogin,
				setNewLogin,
				newPassword,
				setNewPassword,
				newPasswordRepeat,
				setNewPasswordRepeat,
				newName,
				setNewName,
				newSecondName,
				setNewSecondName,
				registerSubmit,
				registerErrors,

				//useChats
				setCurrentChatId,
				chatWithUser,
				setChatWithUser,
				groupChat,
				setGroupChat,
				currentChatId,
				currentChat,
				inputChat,
				setInputChat,
				sendMessage,
				chatWrapperRef,
				endOfMessagesRef,
				createNewChat,
				showChats,
				deleteChat,
				isCurrentChatGroup,
				setisCurrentChatGroup,

				//useContacts
				userContactListId,
				setUserContactListId,
				userContactList,
				showContacts,
				addContact,
				deleteContact,

				//useUser
				user,
				users,
				userChats,
				chatList,
				isUserLoading,

				//useSearch
				searchInput,
				setSearchInput,
				isSearch,
				setIsSearch,
				searchResults,

				//useDropdown
				userNameClick,
				chatheadNameClick,
				sidebarDropdownRef,
				chatheadDropdownRef,
				logout,
			}}
		>
			{loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />}
		</MessengerContext.Provider>
	);
}

export default App;
