import { useEffect, useRef } from 'react';

const useDropdown = (
	setIsSidebarDropdownShow,
	setIsChatHeadDropdownShow,
	setLoginUserId,
	setCurrentChatId,
	setIsContactListShow,
	setIsCreateGroupChatShow,
	setIsChecked,
	setGroupChatName,
) => {
	const sidebarDropdownRef = useRef(null);
	const chatHeadDropdownRef = useRef(null);

	const userNameClick = (event) => {
		event.preventDefault();
		setIsSidebarDropdownShow(true);
	};

	const chatHeadNameClick = (event) => {
		event.preventDefault();
		setIsChatHeadDropdownShow(true);
	};

	const logout = (event) => {
		event.preventDefault();

		const isLogout = confirm('Are you sure you want to log out?');

		if (isLogout) {
			setLoginUserId(null);
			setCurrentChatId(null);

			setIsSidebarDropdownShow(false);
			setIsChatHeadDropdownShow(false);

			setIsContactListShow(false);
			setIsCreateGroupChatShow(false);
			setIsChecked({});
			setGroupChatName('');

			localStorage.removeItem('LoginUserId');
		} else {
			return;
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				sidebarDropdownRef.current &&
				!sidebarDropdownRef.current.contains(event.target)
			) {
				setIsSidebarDropdownShow(false);
			}

			if (
				chatHeadDropdownRef.current &&
				!chatHeadDropdownRef.current.contains(event.target)
			) {
				setIsChatHeadDropdownShow(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		userNameClick,
		chatHeadNameClick,
		sidebarDropdownRef,
		chatHeadDropdownRef,
		logout,
	};
};

export default useDropdown;
