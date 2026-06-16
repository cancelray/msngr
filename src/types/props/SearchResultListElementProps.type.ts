import type { ChatListItem } from '../Chat.type';
import type { Contact } from '../Contact.type';
import type { User } from '../User.type';

export interface SearchResultListElementProps {
	searchResult: User | ChatListItem | Contact;
	searchResultListClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
	dataChatId?: string;
}
