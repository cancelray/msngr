import { MessengerContext } from './context/MessengerContext';

import useUser from './hooks/useUser';

import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';

import useChat from './hooks/useChat';
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

	const { setCurrentChatId, chatWithUser, currentChat } = useChat();

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
				currentChat,
			}}
		>
			<MainPageWrapper />
		</MessengerContext.Provider>
	);
}

export default App;
