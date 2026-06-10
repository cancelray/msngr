import { useMemo } from 'react';

import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';
import useUser from '../hooks/useUser';

import { AuthContext } from '../context/AuthContext';

const AuthProvider = ({ children }) => {
	const {
		loginUserId,
		setLoginUserId,
		loginSubmit,
		loginErrors,
		toRegisterPage,
		isLoginPageShow,
		setIsLoginPageShow,
	} = useLogin();

	const { registerSubmit, registerErrors } = useRegister(setIsLoginPageShow);

	const {
		user,
		isUserLoading,
		userContactListId,
		setUserContactListId,
		getChatList,
		userChats,
		setUserChats,
	} = useUser(loginUserId);

	const value = useMemo(
		() => ({
			//useLogin
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,
			toRegisterPage,
			isLoginPageShow,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

			//useUser
			user,
			isUserLoading,
			userContactListId,
			setUserContactListId,
			getChatList,
			userChats,
			setUserChats,
		}),
		[
			//useLogin
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,
			toRegisterPage,
			isLoginPageShow,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

			//useUser
			user,
			isUserLoading,
			userContactListId,
			setUserContactListId,
			getChatList,
			userChats,
			setUserChats,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
