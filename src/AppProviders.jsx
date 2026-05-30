import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';
import { UIContext } from './context/UIContext';

const AppProviders = (props) => {
	const { authValue, chatValue, UIValue, children } = props;

	return (
		<AuthContext.Provider value={authValue}>
			<ChatContext.Provider value={chatValue}>
				<UIContext.Provider value={UIValue}>{children}</UIContext.Provider>
			</ChatContext.Provider>
		</AuthContext.Provider>
	);
};

export default AppProviders;
