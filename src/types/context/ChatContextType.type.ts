import type React from 'react';

import type { Chat, ChatListItem } from '../Chat.type';
import type { User } from '../User.type';

export interface ChatContextType {
	chatList: ChatListItem[];
	setChatList: React.Dispatch<React.SetStateAction<ChatListItem[]>>;
	userChats: Chat[];
	setUserChats: React.Dispatch<React.SetStateAction<Chat[]>>;
	newChatId: string | null;
	setNewChatId: React.Dispatch<React.SetStateAction<string | null>>;
	setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>;
	chatWithUser: User | null;
	setChatWithUser: React.Dispatch<React.SetStateAction<User | null>>;
	groupChat: User[] | null;
	setGroupChat: React.Dispatch<React.SetStateAction<User[] | null>>;
	currentChatId: string | null;
	currentChat: Chat[] | [];
	sendMessage: (clearInput: string, callbackInputClear: () => void) => void;
	chatWrapperRef: React.RefObject<HTMLInputElement | null>;
	endOfMessagesRef: React.RefObject<HTMLInputElement | null>;
	deleteChat: () => void;
	isCurrentChatGroup: boolean;
	setIsCurrentChatGroup: React.Dispatch<React.SetStateAction<boolean>>;
	setIsNewChatGroup: React.Dispatch<React.SetStateAction<boolean>>;
	userContactList: User[] | [];
	addContact: () => void;
	deleteContact: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
