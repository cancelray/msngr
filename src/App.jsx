import { MessengerContext } from './context/MessengerContext';

import useChat from './hooks/useChat';
import useUser from './hooks/useUser';

import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';

import './styles';

function App() {
	const {
		users,
		user,
		userContactListId,
		userContactList,
		userChats,
		getUsersFromChatList,
	} = useUser();

	const { setCurrentChatId, chatWithUser, currentChatId, currentChat } =
		useChat();

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
			}}
		>
			<MainPageWrapper />
		</MessengerContext.Provider>
	);
}

export default App;
