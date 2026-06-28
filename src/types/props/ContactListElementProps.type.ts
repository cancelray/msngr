import type { User } from '../User.type';

export interface ContactListElementProps {
	contact: User;
	contactListClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
	dataChatId?: string | null;
	isCreateGroupChatShow: boolean;
	isChecked: boolean;
}
