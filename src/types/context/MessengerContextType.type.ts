import type React from 'react';

import type { Message } from '../Message.type';
import type { User } from '../User.type';

export interface MessengerContextType {
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	users: User[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
	isContactListShow: boolean;
	setIsContactListShow: React.Dispatch<React.SetStateAction<boolean>>;
	isCreateGroupChatShow: boolean;
	setIsCreateGroupChatShow: React.Dispatch<React.SetStateAction<boolean>>;
	isSidebarDropdownShow: boolean;
	setIsSidebarDropdownShow: React.Dispatch<React.SetStateAction<boolean>>;
	isChatHeadDropdownShow: boolean;
	setIsChatHeadDropdownShow: React.Dispatch<React.SetStateAction<boolean>>;
}
