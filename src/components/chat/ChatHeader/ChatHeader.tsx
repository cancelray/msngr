import type React from 'react';
import { useSelector } from 'react-redux';

import Button from '../../UI/Button/Button';
import DropdownMenu from '../../UI/DropdownMenu/DropdownMenu';

import useChatContext from '../../../hooks/context/useChatContext';
import useMessengerContext from '../../../hooks/context/useMessengerContext';
import useUIContext from '../../../hooks/context/useUIContext';

import type { State } from '../../../types/store/state.type';

import styles from './ChatHeader.module.css';

const ChatHeader = () => {
	const { isChatHeadDropdownShow, setIsChatHeadDropdownShow } =
		useMessengerContext();

	const loginUserId = useSelector(
		(state: State) => state.loginUserId?.loginUserId,
	);

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
		userChats,
	} = useChatContext();

	const { chatHeadDropdownRef, createNewChat } = useUIContext();

	const chatHeadNameClick = (event: React.MouseEvent) => {
		event.preventDefault();
		setIsChatHeadDropdownShow(true);
	};

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
							className={!isInContact ? styles.disable : undefined}
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

		const clickHandler = (userId: string) => {
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
					{currentChatInfo?.avatar && currentChatInfo.avatar.length > 0 ? (
						<img
							className={styles.avatar}
							src={currentChatInfo?.avatar}
							alt='avatar'
						></img>
					) : (
						<div className={styles.avatarAlt}>
							{currentChatInfo?.name ? currentChatInfo?.name[0] : ''}
						</div>
					)}
					<div>{currentChatInfo?.name}</div>
				</a>
				{isUserChatAdmin ? <p>(admin)</p> : <p>(group)</p>}
				{isChatHeadDropdownShow ? (
					<DropdownMenu
						ref={chatHeadDropdownRef}
						className={styles.dropdownChatHead}
					>
						<div>
							{groupChat.map((user) => (
								<a
									key={user.id}
									onClick={() => clickHandler(user.id)}
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
