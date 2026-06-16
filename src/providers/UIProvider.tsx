import { useMemo } from 'react';

import useCreateChat from '../hooks/useCreateChat';
import useDropdown from '../hooks/useDropdown';
import useSearch from '../hooks/useSearch';

import useAuthContext from '../hooks/context/useAuthContext';
import useChatContext from '../hooks/context/useChatContext';
import useMessengerContext from '../hooks/context/useMessengerContext';

import { UIContext } from '../context/UIContext';

import type { ChildrenProps } from '../types/props/ChildrenProps.type';

const UIProvider = ({ children }: ChildrenProps) => {
	const {
		users,
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		setIsSidebarDropdownShow,
		setIsChatHeadDropdownShow,
	} = useMessengerContext();

	const { loginUserId, toRegisterPage, isLoginPageShow, setIsLoginPageShow } =
		useAuthContext();

	const {
		chatList,
		newChatId,
		setNewChatId,
		setCurrentChatId,
		currentChatId,
		setIsCurrentChatGroup,
		setIsNewChatGroup,
		userContactList,
	} = useChatContext();

	const {
		createNewChat,
		createGroupChat,
		groupChatName,
		setGroupChatName,
		isChecked,
		setIsChecked,
	} = useCreateChat(
		loginUserId,
		setIsNewChatGroup,
		isContactListShow,
		setIsContactListShow,
		setCurrentChatId,
		setIsCreateGroupChatShow,
		setNewChatId,
		setIsCurrentChatGroup,
	);

	const {
		search,
		searchInput,
		setSearchInput,
		isSearch,
		setIsSearch,
		searchResults,
	} = useSearch(
		chatList,
		userContactList,
		users,
		newChatId,
		currentChatId,
		setCurrentChatId,
	);

	const { sidebarDropdownRef, chatHeadDropdownRef } = useDropdown(
		setIsSidebarDropdownShow,
		setIsChatHeadDropdownShow,
	);

	const value = useMemo(
		() => ({
			//useLogin
			isLoginPageShow,
			setIsLoginPageShow,
			toRegisterPage,

			//useCreateChat
			createNewChat,
			createGroupChat,
			groupChatName,
			setGroupChatName,
			isChecked,
			setIsChecked,

			//useSearch
			search,
			searchInput,
			setSearchInput,
			isSearch,
			setIsSearch,
			searchResults,

			//useDropdown
			sidebarDropdownRef,
			chatHeadDropdownRef,
		}),
		[
			//useLogin
			isLoginPageShow,
			setIsLoginPageShow,
			toRegisterPage,

			//useCreateChat
			createNewChat,
			createGroupChat,
			groupChatName,
			setGroupChatName,
			isChecked,
			setIsChecked,

			//useSearch
			search,
			searchInput,
			setSearchInput,
			isSearch,
			setIsSearch,
			searchResults,

			//useDropdown
			sidebarDropdownRef,
			chatHeadDropdownRef,
		],
	);

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIProvider;
