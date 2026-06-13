import { useContext, useMemo } from 'react';

import useCreateChat from '../hooks/useCreateChat';
import useDropdown from '../hooks/useDropdown';
import useSearch from '../hooks/useSearch';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { MessengerContext } from '../context/MessengerContext';
import { UIContext } from '../context/UIContext';

const UIProvider = ({ children }) => {
	const {
		users,
		isContactListShow,
		setIsContactListShow,
		isCreateGroupChatShow,
		setIsCreateGroupChatShow,
		isSidebarDropdownShow,
		setIsSidebarDropdownShow,
		isChatHeadDropdownShow,
		setIsChatHeadDropdownShow,
	} = useContext(MessengerContext);

	const { loginUserId, toRegisterPage, isLoginPageShow, setIsLoginPageShow } =
		useContext(AuthContext);

	const {
		chatList,
		newChatId,
		setNewChatId,
		setCurrentChatId,
		currentChatId,
		setIsCurrentChatGroup,
		setIsNewChatGroup,
		userContactList,
	} = useContext(ChatContext);

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
			isContactListShow,
			setIsContactListShow,
			isSidebarDropdownShow,
			setIsSidebarDropdownShow,
			isChatHeadDropdownShow,
			setIsChatHeadDropdownShow,
			isCreateGroupChatShow,
			setIsCreateGroupChatShow,

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
			isContactListShow,
			setIsContactListShow,
			isSidebarDropdownShow,
			setIsSidebarDropdownShow,
			isChatHeadDropdownShow,
			setIsChatHeadDropdownShow,
			isCreateGroupChatShow,
			setIsCreateGroupChatShow,

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
