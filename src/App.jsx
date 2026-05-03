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
	const [isDropdownShow, setIsDropdownShow] = useState(false);

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
	} = useChat(
		loginUserId,
		isContactListShow,
		setIsContactListShow,
		setIsDropdownShow,
	);

	const {
		userContactListId,
		setUserContactListId,
		userContactList,
		showContacts,
		addContact,
	} = useContacts(
		loginUserId,
		chatWithUser,
		setCurrentChatId,
		setIsDropdownShow,
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

	const { userNameClick, dropdownRef, logout } = useDropdown(
		isDropdownShow,
		setIsDropdownShow,
		setLoginUserId,
		setCurrentChatId,
		isContactListShow,
		setIsContactListShow,
	);

	return (
		<MessengerContext.Provider
			value={{
				isContactListShow,
				setIsContactListShow,
				isDropdownShow,

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

				//useContacts
				userContactListId,
				setUserContactListId,
				userContactList,
				showContacts,
				addContact,

				//useUser
				user,
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
				dropdownRef,
				logout,
			}}
		>
			{loginUserId ? <MainPageWrapper /> : <LoginPageWrapper />}
		</MessengerContext.Provider>
	);
}

export default App;
