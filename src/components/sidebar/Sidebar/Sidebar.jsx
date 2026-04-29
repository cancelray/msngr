import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import ChatList from '../ChatList/ChatList';
import SidebarHeader from '../SidebarHeader/SidebarHeader';

import ContactList from '../ContactList/ContactList';
import styles from './Sidebar.module.css';

const Sidebar = () => {
	const { isContactListShow } = useContext(MessengerContext);

	return (
		<div className={styles.sidebar}>
			<SidebarHeader />
			{isContactListShow ? <ContactList /> : <ChatList />}
		</div>
	);
};

export default Sidebar;
