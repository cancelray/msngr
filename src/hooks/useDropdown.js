import { useEffect, useRef } from 'react';

const useDropdown = (setIsSidebarDropdownShow, setIsChatHeadDropdownShow) => {
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
	}, [setIsChatHeadDropdownShow, setIsSidebarDropdownShow]);

	return {
		userNameClick,
		chatHeadNameClick,
		sidebarDropdownRef,
		chatHeadDropdownRef,
	};
};

export default useDropdown;
