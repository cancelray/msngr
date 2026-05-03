import { useEffect, useRef } from 'react';

const useDropdown = (
	isDropdownShow,
	setIsDropdownShow,
	setLoginUserId,
	setCurrentChatId,
) => {
	const dropdownRef = useRef(null);

	const userNameClick = (event) => {
		event.preventDefault();
		setIsDropdownShow(true);
	};

	const logout = (event) => {
		event.preventDefault();

		const isLogout = confirm('Are you sure you want to log out?');

		if (isLogout) {
			setIsDropdownShow(false);
			setLoginUserId(null);
			setCurrentChatId(null);

			localStorage.removeItem('LoginUserId');
		} else {
			return;
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownShow(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isDropdownShow,
		setIsDropdownShow,
		userNameClick,
		dropdownRef,
		logout,
	};
};

export default useDropdown;
