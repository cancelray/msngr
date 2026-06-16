import type { Message } from './Message.type';
import type { User } from './User.type';

export interface Chat {
	id: string | null;
	chatId?: string | null;
	membersId: (string | null)[];
	isGroup: boolean;
	name: string;
	chatImg?: string;
	img?: string;
	groupChatAdminId?: string | null;
	senderId?: string;
	createdAt: string;
	content?: string;
	avatar: string;
	lastMessageTime: number;
}

export interface GroupChat extends Chat {
	members?: User[];
}

interface LastMessage {
	lastMessage?: string;
	lastMessageAuthor?: string;
	lastMessageAuthorLastName?: string;
	lastMessageAuthorName?: string;
}

export interface ChatListItem extends Chat, LastMessage {
	extra?: Message[];
	members?: User[];
	name: string;
	lastName?: string;
	login?: string;
}
