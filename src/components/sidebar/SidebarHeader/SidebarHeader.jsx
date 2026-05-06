import { useContext } from 'react';
import { MessengerContext } from '../../../context/MessengerContext';

import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import Search from '../Search/Search';
import styles from './SidebarHeader.module.css';

const SidebarHeader = () => {
	const {
		user,
		isSidebarDropdownShow,
		userNameClick,
		sidebarDropdownRef,
		logout,
		showContacts,
		showChats,
	} = useContext(MessengerContext);

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

			{isSidebarDropdownShow ? (
				<DropdownMenu ref={sidebarDropdownRef}>
					<a onClick={showChats}>Chats</a>
					<a onClick={showContacts}>Contacts</a>
					<a onClick={logout}>Log out</a>
				</DropdownMenu>
			) : null}
			<Search />
		</div>
	);
};

export default SidebarHeader;
