import Chat from '../chat/Chat/Chat';
import Sidebar from '../sidebar/Sidebar/Sidebar';

import styles from './MainPageWrapper.module.css';

const MainPageWrapper = () => {
	return <div className={styles.mainPageWrapper}>
		<Sidebar />
		<Chat />
	</div>;
};

export default MainPageWrapper;
