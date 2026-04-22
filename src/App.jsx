import { MessengerContext } from './context/MessengerContext';

import useChat from './hooks/useChat';
import useUser from './hooks/useUser';

import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';
import Loader from './components/UI/Loader/Loader';

import './styles';

function App() {
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
	} = useChat();

	const {
		users,
		user,
		userContactListId,
		userContactList,
		userChats,
		getUsersFromChatList,
		chatList,
		isUserLoading,
	} = useUser(messages);

	return (
		<MessengerContext.Provider
			value={{
				users,
				user,
				userContactListId,
				userContactList,
				userChats,
				getUsersFromChatList,
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
			{isUserLoading ? <Loader /> : <MainPageWrapper />}
		</MessengerContext.Provider>
	);
}

export default App;
