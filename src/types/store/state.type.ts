import type { User } from '../User.type';

type loginUserId = { loginUserId: string };

export interface State {
	user: User | null;
	loginUserId: loginUserId;
}
