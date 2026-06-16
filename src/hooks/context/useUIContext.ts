import { useContext } from 'react';

import { UIContext } from '../../context/UIContext';

const useUIContext = () => {
	const context = useContext(UIContext);

	if (!context) {
		throw new Error('Chat Context Error');
	}

	return context;
};

export default useUIContext;
