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
	const [isCreateGroupChatShow, setIsCreateGroupChatShow] = useState(false);
	const [isSidebarDropdownShow, setIsSidebarDropdownShow] = useState(false);
	const [isChatHeadDropdownShow, setIsChatHeadDropdownShow] = useState(false);

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
		chatList,
		setChatList,
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
		setIsCurrentChatGroup,
		createGroupChat,
		isChecked,
		setIsChecked,
		groupChatName,
		setGroupChatName,
	} = useChat(
		loginUserId,
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		setIsSidebarDropdownShow,
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
		setIsCreateGroupChatShow,
		setIsChecked,
		setGroupChatName,
	);

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

	const { searchInput, setSearchInput, isSearch, setIsSearch, searchResults } =
		useSearch(chatList, userContactList, users);

	const {
		userNameClick,
		chatHeadNameClick,
		sidebarDropdownRef,
		chatHeadDropdownRef,
		logout,
	} = useDropdown(
		setIsSidebarDropdownShow,
		setIsChatHeadDropdownShow,
		setLoginUserId,
		setCurrentChatId,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		setIsChecked,
		setGroupChatName,
	);

	return (
		<MessengerContext.Provider
			value={{
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
				chatList,
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
				showContacts,
				addContact,
				deleteContact,

				//useUser
				user,
				users,
				userChats,
				isUserLoading,

				//useSearch
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
				logout,
			}}
		>
			{loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />}
		</MessengerContext.Provider>
	);
}

export default App;
