import { createContext } from 'react';

import type { ChatContextType } from '../types/context/ChatContextType.type';

export const ChatContext = createContext<ChatContextType | null>(null);
