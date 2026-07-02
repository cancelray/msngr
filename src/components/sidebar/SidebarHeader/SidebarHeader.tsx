import { useDispatch, useSelector } from 'react-redux';

import useMessengerContext from '../../../hooks/context/useMessengerContext';
import useUIContext from '../../../hooks/context/useUIContext';

import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';
import Search from '../Search/Search';

import { logoutUserId } from '../../../store/auth/loginUserId.slice';

import { selectUser } from '../../../store/auth/user.slice';
import { closeChat } from '../../../store/chat/currentChatId.slice';

import styles from './SidebarHeader.module.css';

const SidebarHeader = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const {
		setIsChatHeadDropdownShow,
		isSidebarDropdownShow,
		setIsSidebarDropdownShow,
		isContactListShow,
		setIsContactListShow,
		setIsCreateGroupChatShow,
	} = useMessengerContext();

	const { sidebarDropdownRef, setIsChecked, setGroupChatName } = useUIContext();

	const userNameClick = (event: React.MouseEvent) => {
		event.preventDefault();
		setIsSidebarDropdownShow(true);
	};

	const dropdownMenuClickHandler = (event: React.MouseEvent<HTMLElement>) => {
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
				dispatch(closeChat());

				if (!isContactListShow) {
					setIsContactListShow(true);
				}

				break;
			}
			case 'toCreateGroupChat': {
				dispatch(closeChat());
				setIsCreateGroupChatShow(true);
				setIsContactListShow(true);

				setIsSidebarDropdownShow(false);

				break;
			}
			case 'logout': {
				const isLogout = confirm('Are you sure you want to log out?');

				if (isLogout) {
					dispatch(logoutUserId());
					dispatch(closeChat());

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
					<p>{user?.name + ' ' + user?.lastName}</p>
					{user && user.avatar.length > 0 ? (
						<img
							className={styles.userAvatar}
							src={user?.avatar}
							alt='avatar'
						></img>
					) : (
						<div className={styles.avatarAlt}>
							{user?.name ? user.name[0] : ''}
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
