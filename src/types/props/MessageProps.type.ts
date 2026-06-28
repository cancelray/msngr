import type { Chat } from '../Chat.type';
import type { User } from '../User.type';

export interface MessageProps {
	message: Chat;
	messageAuthor?: User;
	isShowAuthorName: boolean;
}
