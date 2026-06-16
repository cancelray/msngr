import type { Message } from '../Message.type';
import type { User } from '../User.type';

export interface MessageProps {
	message: Message;
	messageAuthor?: User;
	isShowAuthorName: boolean;
	loginUserId: string | null;
}
