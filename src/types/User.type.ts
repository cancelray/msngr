export interface User {
	id: string;
	name: string;
	lastName: string;
	login: string;
	password?: string;
	avatar: string;
	chatId?: string;
	isGroup?: boolean;
}
