import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';
import { UIContext } from '../../../context/UIContext';

import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import Search from '../Search/Search';
import styles from './SidebarHeader.module.css';

const SidebarHeader = () => {
	const { user, setLoginUserId } = useContext(AuthContext);
	const { setCurrentChatId } = useContext(ChatContext);
	const {
		setIsChatHeadDropdownShow,
		isSidebarDropdownShow,
		setIsSidebarDropdownShow,
		sidebarDropdownRef,
		setIsChecked,
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		setGroupChatName,
	} = useContext(UIContext);

	const userNameClick = (event) => {
		event.preventDefault();
		setIsSidebarDropdownShow(true);
	};

	const dropdownMenuClickHandler = (event) => {
		event.preventDefault();

		const targetAction = event.currentTarget.dataset.action;

		switch (targetAction) {
			case 'toChats': {
				setIsSidebarDropdownShow(false);
				setIsChecked({});
				setGroupChatName('');

				if (isContactListShow) {
					setIsContactListShow(false);
				}

				break;
			}
			case 'toContacts': {
				setIsCreateGroupChatShow(false);
				setIsChecked({});
				setGroupChatName('');

				setIsSidebarDropdownShow(false);
				setCurrentChatId(null);

				if (!isContactListShow) {
					setIsContactListShow(true);
				}

				break;
			}
			case 'toCreateGroupChat': {
				setCurrentChatId(null);
				setIsCreateGroupChatShow(true);
				setIsContactListShow(true);

				setIsSidebarDropdownShow(false);

				break;
			}
			case 'logout': {
				const isLogout = confirm('Are you sure you want to log out?');

				if (isLogout) {
					setLoginUserId(null);
					setCurrentChatId(null);

					setIsSidebarDropdownShow(false);
					setIsChatHeadDropdownShow(false);

					setIsContactListShow(false);
					setIsCreateGroupChatShow(false);
					setIsChecked({});
					setGroupChatName('');

					localStorage.removeItem('LoginUserId');
				}

				break;
			}
		}
	};

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
					<a
						onClick={dropdownMenuClickHandler}
						data-action='toChats'
					>
						Chats
					</a>
					<a
						onClick={dropdownMenuClickHandler}
						data-action='toContacts'
					>
						Contacts
					</a>
					<a
						onClick={dropdownMenuClickHandler}
						data-action='toCreateGroupChat'
					>
						Create group chat
					</a>
					<a
						onClick={dropdownMenuClickHandler}
						data-action='logout'
					>
						Log out
					</a>
				</DropdownMenu>
			) : null}
			<Search />
		</div>
	);
};

export default SidebarHeader;
