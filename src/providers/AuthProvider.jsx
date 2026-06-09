import { useContext, useMemo } from 'react';

import useChatList from '../hooks/useChatList';
import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';
import useUser from '../hooks/useUser';

import { MessengerContext } from '../context/MessengerContext';
import { AuthContext } from '../context/AuthContext';

const AuthProvider = ({ children }) => {
	const { messages, users } = useContext(MessengerContext);

	const {
		loginUserId,
		setLoginUserId,
		loginSubmit,
		loginErrors,
		setIsLoginPageShow,
	} = useLogin();

	const { registerSubmit, registerErrors } = useRegister(setIsLoginPageShow);

	const { getChatList } = useChatList(messages, users, loginUserId);

	const { user, isUserLoading } = useUser(loginUserId, getChatList);

	const value = useMemo(
		() => ({
			//useLogin
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

			//useChatList
			getChatList,

			//useUser
			user,
			isUserLoading,
		}),
		[
			//useLogin
			loginUserId,
			setLoginUserId,
			loginSubmit,
			loginErrors,
			setIsLoginPageShow,

			//useRegister
			registerSubmit,
			registerErrors,

			//useChatList
			getChatList,

			//useUser
			user,
			isUserLoading,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
