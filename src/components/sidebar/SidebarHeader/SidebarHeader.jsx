import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Search from '../Search/Search';
import styles from './SidebarHeader.module.css';

const SidebarHeader = () => {
	const { user, isDropdownShow, userNameClick } = useContext(MessengerContext);

	return (
		<div className={styles.sidebarHeader}>
			<div className={styles.head}>
				<h2>Чаты</h2>
				<a
					className={styles.userInfo}
					onClick={userNameClick}
				>
					<p>{user.name + ' ' + user.lastName}</p>
					{user.avatar?.length > 0 ? (
						<img
							className={styles.userAvatar}
							src={user.avatar}
							alt='avatar'
						></img>
					) : (
						<div className={styles.avatarAlt}>
							{user.name ? user.name[0] : ''}
						</div>
					)}
				</a>
			</div>
			{isDropdownShow ? <DropdownMenu /> : null}
			<Search />
		</div>
	);
};

export default SidebarHeader;
