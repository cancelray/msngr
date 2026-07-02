import { useContext } from 'react';

import { UIContext } from '../../context/UIContext';

const useUIContext = () => {
	const context = useContext(UIContext);

	if (!context) {
		throw new Error('UI Context Error');
	}

	return context;
};

export default useUIContext;
