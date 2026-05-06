import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import Button from '../../UI/Button/Button';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';

import styles from './ChatHeader.module.css';

const ChatHeader = () => {
	const {
		chatWithUser,
		groupChat,
		chatList,
		currentChatId,
		userContactList,
		addContact,
		deleteChat,
		isChatheadDropdownShow,
		chatheadNameClick,
		chatheadDropdownRef,
		deleteContact,
	} = useContext(MessengerContext);

	if (chatWithUser) {
		const isInContact = userContactList.find(
			(contact) => String(contact?.id) === String(chatWithUser?.id),
		);

		return (
			<div className={styles.chatHeader}>
				<a onClick={chatheadNameClick}>
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
				{isChatheadDropdownShow ? (
					<DropdownMenu
						ref={chatheadDropdownRef}
						className={styles.dropdowChathead}
					>
						<div>@{chatWithUser.login}</div>
						<a
							className={!isInContact ? styles.disable : null}
							onClick={deleteContact}
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

		return (
			<div className={styles.chatHeader}>
				<a onClick={chatheadNameClick}>
					{currentChatInfo.avatar?.length > 0 ? (
						<img
							className={styles.avatar}
							src={currentChatInfo.avatar}
							alt='avatar'
						></img>
					) : (
						<div className={styles.avatarAlt}>
							{currentChatInfo.name ? currentChatInfo?.name[0] : ''}
						</div>
					)}
					<div>{currentChatInfo.name}</div>
				</a>
				{isChatheadDropdownShow ? (
					<DropdownMenu
						ref={chatheadDropdownRef}
						className={styles.dropdowChathead}
					>
						<div>@{currentChatInfo.name}</div>
					</DropdownMenu>
				) : null}
				<Button onClick={deleteChat}>Delete chat</Button>
			</div>
		);
	}
};

export default ChatHeader;
