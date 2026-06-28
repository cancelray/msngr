import { useContext } from 'react';

import { ChatContext } from '../../context/ChatContext';

const useChatContext = () => {
	const context = useContext(ChatContext);

	if (!context) {
		throw new Error('Chat Context Error');
	}

	return context;
};

export default useChatContext;
