import type React from 'react';

import type { AuthError } from '../AuthError.type';
import type { Chat } from '../Chat.type';
import type { Contact } from '../Contact.type';
import type { User } from '../User.type';

export interface AuthContextType {
	loginSubmit: (
		loginInput: string,
		passwordInput: string,
		callbackClear: () => void,
	) => void;
	loginErrors: AuthError;
	toRegisterPage: (callbackClear: () => void) => void;
	isLoginPageShow: boolean;
	setIsLoginPageShow: React.Dispatch<React.SetStateAction<boolean>>;
	registerSubmit: (
		newLogin: string,
		newPassword: string,
		newPasswordRepeat: string,
		newName: string,
		newSecondName: string,
		clearCallback: () => void,
	) => void;
	registerErrors: AuthError;
	user: User | null;
	isUserLoading: boolean;
	userContactListId: Contact[];
	setUserContactListId: React.Dispatch<React.SetStateAction<Contact[]>>;
	getChatList: (loginUserId: string) => void;
	userChats: Chat[];
	setUserChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}
