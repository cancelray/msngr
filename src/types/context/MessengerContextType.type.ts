import type React from 'react';

export interface MessengerContextType {
	isContactListShow: boolean;
	setIsContactListShow: React.Dispatch<React.SetStateAction<boolean>>;
	isCreateGroupChatShow: boolean;
	setIsCreateGroupChatShow: React.Dispatch<React.SetStateAction<boolean>>;
	isSidebarDropdownShow: boolean;
	setIsSidebarDropdownShow: React.Dispatch<React.SetStateAction<boolean>>;
	isChatHeadDropdownShow: boolean;
	setIsChatHeadDropdownShow: React.Dispatch<React.SetStateAction<boolean>>;
}
