import { useContext } from 'react';

import { UIContext } from '../../context/UIContext';

import Loader from '../UI/Loader/Loader';
import Chat from '../chat/Chat/Chat';
import Sidebar from '../sidebar/Sidebar/Sidebar';

import styles from './MainPageWrapper.module.css';

const MainPageWrapper = () => {
	const { isUserLoading } = useContext(UIContext);

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
