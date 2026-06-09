import AuthProvider from './providers/AuthProvider';
import ChatProvider from './providers/ChatProvider';
import MessengerProvider from './providers/MessengerProvider';
import UIProvider from './providers/UIProvider';

import AppWrapper from './components/AppWrapper/AppWrapper';

const AppProviders = () => {
	return (
		<MessengerProvider>
			<AuthProvider>
				<ChatProvider>
					<UIProvider>
						<AppWrapper />
					</UIProvider>
				</ChatProvider>
			</AuthProvider>
		</MessengerProvider>
	);
};

export default AppProviders;
