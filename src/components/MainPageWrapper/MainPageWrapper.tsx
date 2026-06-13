import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';

import Loader from '../UI/Loader/Loader';
import Chat from '../chat/Chat/Chat';
import Sidebar from '../sidebar/Sidebar/Sidebar';

import styles from './MainPageWrapper.module.css';

const MainPageWrapper = () => {
	const { isUserLoading } = useContext(AuthContext);

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
