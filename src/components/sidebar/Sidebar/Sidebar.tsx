import ChatList from '../ChatList/ChatList';
import ContactList from '../ContactList/ContactList';
import SearchResultList from '../SearchResultList/SearchResultList';
import SidebarHeader from '../SidebarHeader/SidebarHeader';

import useUIContext from '../../../hooks/context/useUIContext';
import useMessengerContext from '../../../hooks/context/useMessengerContext';

import styles from './Sidebar.module.css';

const Sidebar = () => {
	const { isContactListShow } = useMessengerContext();

	const { isSearch } = useUIContext();

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
