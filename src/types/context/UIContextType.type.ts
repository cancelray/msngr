import type React from 'react';

import type { ChatListItem } from '../Chat.type';
import type { Check } from '../Check.type';
import type { Contact } from '../Contact.type';
import type { User } from '../User.type';

export interface UIContextType {
	isLoginPageShow: boolean;
	setIsLoginPageShow: React.Dispatch<React.SetStateAction<boolean>>;
	toRegisterPage: (callbackClear: () => void) => void;
	createNewChat: (userId: string) => void;
	createGroupChat: () => void;
	groupChatName: string;
	setGroupChatName: React.Dispatch<React.SetStateAction<string>>;
	isChecked: Check;
	setIsChecked: React.Dispatch<React.SetStateAction<Check>>;
	search: (event: React.ChangeEvent<HTMLInputElement>) => void;
	searchInput: string;
	setSearchInput: React.Dispatch<React.SetStateAction<string>>;
	isSearch: boolean;
	setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
	searchResults: (ChatListItem | Contact | User)[];
	sidebarDropdownRef: React.RefObject<HTMLDivElement | null>;
	chatHeadDropdownRef: React.RefObject<HTMLDivElement | null>;
}
