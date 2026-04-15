import { MessengerContext } from './context/context';

import useUser from './hooks/useUser';

import MainPageWrapper from './components/MainPageWrapper/MainPageWrapper';

import './styles';

function App() {
	const { user, userContactListId, userContactList, userChats } = useUser();

	return (
		<MessengerContext.Provider
			value={{ user, userContactListId, userContactList, userChats }}
		>
			<MainPageWrapper />
		</MessengerContext.Provider>
	);
}

export default App;
