import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import styles from './DropdownMenu.module.css';

const DropdownMenu = () => {
	const { dropdownRef, logout, showContacts, showChats } =
		useContext(MessengerContext);

	return (
		<div
			className={styles.dropdown}
			ref={dropdownRef}
		>
			<a onClick={showChats}>Chats</a>
			<a onClick={showContacts}>Contacts</a>
			<a onClick={logout}>Log out</a>
		</div>
	);
};

export default DropdownMenu;
