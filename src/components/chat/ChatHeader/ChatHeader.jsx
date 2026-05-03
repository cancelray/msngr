import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import Button from '../../UI/Button/Button';

import styles from './ChatHeader.module.css';

const ChatHeader = () => {
	const { chatWithUser, userContactList, addContact, deleteChat } =
		useContext(MessengerContext);

	if (chatWithUser) {
		return (
			<div className={styles.chatHeader}>
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
				<div className={styles.contactInfo}>
					{userContactList.find(
						(contact) => String(contact?.id) === String(chatWithUser?.id),
					) ? (
						'(in contacts)'
					) : (
						<a onClick={addContact}>(add contact)</a>
					)}
				</div>
				<Button onClick={deleteChat}>Delete chat</Button>
			</div>
		);
	}
};

export default ChatHeader;
