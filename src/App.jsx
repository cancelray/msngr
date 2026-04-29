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
	} = useContacts(
		setCurrentChatId,
		setIsDropdownShow,
		isContactListShow,
		setIsContactListShow,
	);

	const { user, userChats, chatList, isUserLoading } = useUser(
		messages,
		loginUserId,
		setUserContactListId,
	);

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

				userContactListId,
				setUserContactListId,
				userContactList,
				showContacts,

				user,
				userChats,
				chatList,
				isUserLoading,

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
