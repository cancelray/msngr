import { useMemo } from 'react';

import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';
import useUser from '../hooks/useUser';

import { AuthContext } from '../context/AuthContext';

import type { ChildrenProps } from '../types/props/ChildrenProps.type';

const AuthProvider = ({ children }: ChildrenProps) => {
	const {
		loginSubmit,
		loginErrors,
		toRegisterPage,
		isLoginPageShow,
		setIsLoginPageShow,
	} = useLogin();

	const { registerSubmit, registerErrors } = useRegister(setIsLoginPageShow);

	const {
		isUserLoading,
		getChatList,
	} = useUser();

	const value = useMemo(
		() => ({
			//useLogin
			loginSubmit,
			loginErrors,
			toRegisterPage,
			isLoginPageShow,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

			//useUser
			isUserLoading,
			getChatList,
		}),
		[
			//useLogin
			loginSubmit,
			loginErrors,
			toRegisterPage,
			isLoginPageShow,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

			//useUser
			isUserLoading,
			getChatList,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
