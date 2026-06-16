import Loader from '../UI/Loader/Loader';
import Chat from '../chat/Chat/Chat';
import Sidebar from '../sidebar/Sidebar/Sidebar';

import useAuthContext from '../../hooks/context/useAuthContext';

import styles from './MainPageWrapper.module.css';

const MainPageWrapper = () => {
	const { isUserLoading } = useAuthContext();

	return (
		<>
			{isUserLoading ? (
				<Loader />
			) : (
				<div className={styles.mainPageWrapper}>
					<Sidebar />
					<Chat />
				</div>
			)}
		</>
	);
};

export default MainPageWrapper;
