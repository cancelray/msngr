import { useEffect, useRef } from 'react';

const useDropdown = (
	setIsSidebarDropdownShow: React.Dispatch<React.SetStateAction<boolean>>,
	setIsChatHeadDropdownShow: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const sidebarDropdownRef = useRef<HTMLDivElement>(null);
	const chatHeadDropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarDropdownRef.current &&
				!sidebarDropdownRef.current.contains(event.target as Node)
			) {
				setIsSidebarDropdownShow(false);
			}

			if (
				chatHeadDropdownRef.current &&
				!chatHeadDropdownRef.current.contains(event.target as Node)
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
		sidebarDropdownRef,
		chatHeadDropdownRef,
	};
};

export default useDropdown;
