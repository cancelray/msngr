import { useMemo, useState } from 'react';
import { MessengerContext } from '../context/MessengerContext';

import type { Message } from '../types/Message.type';
import type { ChildrenProps } from '../types/props/ChildrenProps.type';
import type { User } from '../types/User.type';

const MessengerProvider = ({ children }: ChildrenProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	const [isContactListShow, setIsContactListShow] = useState<boolean>(false);
	const [isCreateGroupChatShow, setIsCreateGroupChatShow] =
		useState<boolean>(false);
	const [isSidebarDropdownShow, setIsSidebarDropdownShow] =
		useState<boolean>(false);
	const [isChatHeadDropdownShow, setIsChatHeadDropdownShow] =
		useState<boolean>(false);

	const value = useMemo(
		() => ({
			messages,
			setMessages,
			users,
			setUsers,

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
			messages,
			users,

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
