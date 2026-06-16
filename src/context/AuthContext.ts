import { createContext } from 'react';

import type { AuthContextType } from '../types/context/AuthContextType.type';

export const AuthContext = createContext<AuthContextType | null>(null);
