import { useEffect, useRef } from 'react';

const useDropdown = (
	setIsSidebarDropdownShow,
	setIsChatheadDropdownShow,
	setLoginUserId,
	setCurrentChatId,
) => {
	const sidebarDropdownRef = useRef(null);
	const chatheadDropdownRef = useRef(null);

	const userNameClick = (event) => {
		event.preventDefault();
		setIsSidebarDropdownShow(true);
	};

	const chatheadNameClick = (event) => {
		event.preventDefault();
		setIsChatheadDropdownShow(true);
	};

	const logout = (event) => {
		event.preventDefault();

		const isLogout = confirm('Are you sure you want to log out?');

		if (isLogout) {
			setIsSidebarDropdownShow(false);
			setLoginUserId(null);
			setCurrentChatId(null);

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
				chatheadDropdownRef.current &&
				!chatheadDropdownRef.current.contains(event.target)
			) {
				setIsChatheadDropdownShow(false);
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
		chatheadNameClick,
		sidebarDropdownRef,
		chatheadDropdownRef,
		logout,
	};
};

export default useDropdown;
