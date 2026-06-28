export interface Contact {
	id?: string;
	userId: string | number | null;
	contactId: string | number | undefined;
	name?: string;
	lastName?: string;
	login?: string;
	avatar?: string;
}
