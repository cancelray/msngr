import ChatList from '../ChatList/ChatList';
import SidebarHeader from '../SidebarHeader/SidebarHeader';

import styles from './Sidebar.module.css';

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<SidebarHeader />
			<ChatList />
		</div>
	);
};

export default Sidebar;
