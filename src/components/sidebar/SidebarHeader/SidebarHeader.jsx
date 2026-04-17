import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import styles from './SidebarHeader.module.css';

const SidebarHeader = () => {
	const { user } = useContext(MessengerContext);

	return (
		<div className={styles.sidebarHeader}>
			<div className={styles.head}>
				<h2>Чаты</h2>
				<div className={styles.userInfo}>
					<p>{user.name + ' ' + user.lastName}</p>
					<img
						className={styles.userAvatar}
						src={user.avatar}
						alt='avatar'
					/>
				</div>
			</div>
			<div className={styles.search}>
				<input
					type='text'
					placeholder='Поиск или новый чат'
				/>
			</div>
		</div>
	);
};

export default SidebarHeader;
