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
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		setIsSidebarDropdownShow,
		setIsChatHeadDropdownShow,
	} = useMessengerContext();

	const { toRegisterPage, isLoginPageShow, setIsLoginPageShow } =
		useAuthContext();

	const {
		newChatId,
		setNewChatId,
		setIsCurrentChatGroup,
		setIsNewChatGroup,
	} = useChatContext();

	const {
		createNewChat,
		createGroupChat,
		groupChatName,
		setGroupChatName,
		isChecked,
		setIsChecked,
	} = useCreateChat(
		setIsNewChatGroup,
		isContactListShow,
		setIsContactListShow,
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
		newChatId,
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
