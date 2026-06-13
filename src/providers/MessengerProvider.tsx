import { useMemo, useState } from 'react';
import { MessengerContext } from '../context/MessengerContext';

const MessengerProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	const [isContactListShow, setIsContactListShow] = useState(false);
	const [isCreateGroupChatShow, setIsCreateGroupChatShow] = useState(false);
	const [isSidebarDropdownShow, setIsSidebarDropdownShow] = useState(false);
	const [isChatHeadDropdownShow, setIsChatHeadDropdownShow] = useState(false);

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
