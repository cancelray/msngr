import { createContext } from 'react';

import type { UIContextType } from '../types/context/UIContextType.type';

export const UIContext = createContext<UIContextType | null>(null);
