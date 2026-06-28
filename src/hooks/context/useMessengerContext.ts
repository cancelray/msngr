import { useContext } from 'react';

import { MessengerContext } from '../../context/MessengerContext';

const useMessengerContext = () => {
	const context = useContext(MessengerContext);

	if (!context) {
		throw new Error('Messenger Context Error');
	}

	return context;
};

export default useMessengerContext;
