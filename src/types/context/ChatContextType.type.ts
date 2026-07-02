import type React from 'react';

import type { User } from '../User.type';

export interface ChatContextType {
	newChatId: string | null;
	setNewChatId: React.Dispatch<React.SetStateAction<string | null>>;
	chatWithUser: User | null;
	setChatWithUser: React.Dispatch<React.SetStateAction<User | null>>;
	groupChat: User[] | null;
	setGroupChat: React.Dispatch<React.SetStateAction<User[] | null>>;
	sendMessage: (clearInput: string, callbackInputClear: () => void) => void;
	chatWrapperRef: React.RefObject<HTMLDivElement | null>;
	endOfMessagesRef: React.RefObject<HTMLDivElement | null>;
	deleteChat: () => void;
	isCurrentChatGroup: boolean;
	setIsCurrentChatGroup: React.Dispatch<React.SetStateAction<boolean>>;
	setIsNewChatGroup: React.Dispatch<React.SetStateAction<boolean>>;
	addContact: () => void;
	deleteContact: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
