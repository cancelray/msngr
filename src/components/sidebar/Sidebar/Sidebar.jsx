import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import ChatList from '../ChatList/ChatList';
import ContactList from '../ContactList/ContactList';
import SearchResultList from '../SearchResultList/SearchResultList';
import SidebarHeader from '../SidebarHeader/SidebarHeader';

import styles from './Sidebar.module.css';

const Sidebar = () => {
	const { isContactListShow, isSearch } = useContext(MessengerContext);

	return (
		<div className={styles.sidebar}>
			<SidebarHeader />
			{isSearch ? (
				<SearchResultList />
			) : isContactListShow ? (
				<ContactList />
			) : (
				<ChatList />
			)}
		</div>
	);
};

export default Sidebar;
