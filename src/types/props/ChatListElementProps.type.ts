import type { ChatListItem } from '../Chat.type';

export interface ChatListElementProps {
	chat: ChatListItem;
	clickHandler: () => void;
}
