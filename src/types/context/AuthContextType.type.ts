import type React from 'react';

import type { AuthError } from '../AuthError.type';

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
	isUserLoading: boolean;
	getChatList: (loginUserId: string) => void;
}
