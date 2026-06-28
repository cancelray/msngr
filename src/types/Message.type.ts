export interface Message {
	id?: string;
	chatId: string;
	senderId: string | number | null;
	content: string;
	createdAt: number;
}
