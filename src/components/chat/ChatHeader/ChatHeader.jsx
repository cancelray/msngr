import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';

import { UIContext } from '../../../context/UIContext';
import Button from '../../UI/Button/Button';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';

import styles from './ChatHeader.module.css';

const ChatHeader = () => {
	const { loginUserId } = useContext(AuthContext);
	const {
		chatWithUser,
		groupChat,
		chatList,
		currentChatId,
		userContactList,
		addContact,
		deleteChat,
		deleteContact,
		setChatWithUser,
		setGroupChat,
		setCurrentChatId,
		setIsCurrentChatGroup,
		createNewChat,
		userChats,
	} = useContext(ChatContext);
	const {
		isChatHeadDropdownShow,
		setIsChatHeadDropdownShow,
		chatHeadNameClick,
		chatHeadDropdownRef,
	} = useContext(UIContext);

	if (chatWithUser) {
		const isInContact = userContactList.find(
			(contact) => String(contact?.id) === String(chatWithUser?.id),
		);

		return (
			<div className={styles.chatHeader}>
				<a onClick={chatHeadNameClick}>
					{chatWithUser.avatar.length > 0 ? (
						<img
							className={styles.avatar}
							src={chatWithUser.avatar}
							alt='avatar'
						></img>
					) : (
						<div className={styles.avatarAlt}>
							{chatWithUser.name ? chatWithUser?.name[0] : ''}
						</div>
					)}
					<div>{chatWithUser.name + ' ' + chatWithUser.lastName}</div>
				</a>
				{isChatHeadDropdownShow ? (
					<DropdownMenu
						ref={chatHeadDropdownRef}
						className={styles.dropdownChatHead}
					>
						<p>@{chatWithUser.login}</p>
						<a
							className={!isInContact ? styles.disable : null}
							onClick={deleteContact}
							data-is-disable={!isInContact ? 'disable' : null}
						>
							Delete Contact
						</a>
					</DropdownMenu>
				) : null}
				<div className={styles.contactInfo}>
					{isInContact ? (
						'(in contacts)'
					) : (
						<a onClick={addContact}>(add contact)</a>
					)}
				</div>
				<Button onClick={deleteChat}>Delete chat</Button>
			</div>
		);
	} else if (groupChat) {
		const currentChatInfo = chatList.find((chat) => chat.id === currentChatId);

		const isUserChatAdmin =
			chatList.find((chat) => chat.id === currentChatId)?.groupChatAdminId ===
			loginUserId;

		const clickHandler = (event) => {
			const userId = event.currentTarget.dataset.userId;

			const chatWithClickedUser = userChats.find(
				(chat) =>
					chat.membersId.length === 2 && chat.membersId.includes(userId),
			);

			if (chatWithClickedUser) {
				setCurrentChatId(chatWithClickedUser.id);
			} else {
				createNewChat(userId);
			}

			setIsCurrentChatGroup(false);
			setChatWithUser(null);
			setGroupChat(null);
			setIsChatHeadDropdownShow(false);
		};

		return (
			<div className={styles.chatHeader}>
				<a onClick={chatHeadNameClick}>
					{currentChatInfo?.avatar?.length > 0 ? (
						<img
							className={styles.avatar}
							src={currentChatInfo.avatar}
							alt='avatar'
						></img>
					) : (
						<div className={styles.avatarAlt}>
							{currentChatInfo?.name ? currentChatInfo?.name[0] : ''}
						</div>
					)}
					<div>{currentChatInfo?.name}</div>
				</a>
				{isUserChatAdmin ? <p>(admin)</p> : ''}
				{isChatHeadDropdownShow ? (
					<DropdownMenu
						ref={chatHeadDropdownRef}
						className={styles.dropdownChatHead}
					>
						<div>
							{groupChat.map((user) => (
								<a
									key={user.id}
									data-user-id={user.id}
									onClick={clickHandler}
								>{`${user.name} ${user.lastName} (@${user.login})`}</a>
							))}
						</div>
					</DropdownMenu>
				) : null}
				<Button onClick={deleteChat}>Delete chat</Button>
			</div>
		);
	}
};

export default ChatHeader;
