import { createContext } from 'react';

import type { MessengerContextType } from '../types/context/MessengerContextType.type';

export const MessengerContext = createContext<MessengerContextType | null>(
	null,
);
