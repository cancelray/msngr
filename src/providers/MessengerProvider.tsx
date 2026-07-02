import { useMemo, useState } from 'react';
import { MessengerContext } from '../context/MessengerContext';

import type { ChildrenProps } from '../types/props/ChildrenProps.type';

const MessengerProvider = ({ children }: ChildrenProps) => {
	const [isContactListShow, setIsContactListShow] = useState<boolean>(false);
	const [isCreateGroupChatShow, setIsCreateGroupChatShow] =
		useState<boolean>(false);
	const [isSidebarDropdownShow, setIsSidebarDropdownShow] =
		useState<boolean>(false);
	const [isChatHeadDropdownShow, setIsChatHeadDropdownShow] =
		useState<boolean>(false);

	const value = useMemo(
		() => ({
			isContactListShow,
			setIsContactListShow,
			isCreateGroupChatShow,
			setIsCreateGroupChatShow,
			isSidebarDropdownShow,
			setIsSidebarDropdownShow,
			isChatHeadDropdownShow,
			setIsChatHeadDropdownShow,
		}),
		[
			isContactListShow,
			isCreateGroupChatShow,
			isSidebarDropdownShow,
			isChatHeadDropdownShow,
		],
	);

	return (
		<MessengerContext.Provider value={value}>
			{children}
		</MessengerContext.Provider>
	);
};

export default MessengerProvider;
