import { MessengerContext } from './context/MessengerContext';

import useChat from './hooks/useChat';
import useLogin from './hooks/useLogin';
import useUser from './hooks/useUser';

import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';

import LoginPage from './components/LoginPage/LoginPage';

import './styles';

function App() {
	const {
		loginUserId,
		loginInput,
		setLoginInput,
		passwordInput,
		setPasswordInput,
		loginSubmit,
	} = useLogin();

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
	} = useChat(loginUserId);

	const {
		user,
		userContactListId,
		userContactList,
		userChats,
		chatList,
		isUserLoading,
	} = useUser(messages, loginUserId);

	return (
		<MessengerContext.Provider
			value={{
				loginUserId,
				loginInput,
				setLoginInput,
				passwordInput,
				setPasswordInput,
				loginSubmit,
				user,
				isUserLoading,
				userContactListId,
				userContactList,
				userChats,
				setCurrentChatId,
				chatWithUser,
				currentChatId,
				currentChat,
				chatList,
				inputChat,
				setInputChat,
				sendMessage,
				chatWrapperRef,
				endOfMessagesRef,
			}}
		>
			{loginUserId ? <MainPageWrapper /> : <LoginPage />}
		</MessengerContext.Provider>
	);
}

export default App;
