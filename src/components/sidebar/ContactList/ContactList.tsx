import React from 'react';

import Button from '../../UI/Button/Button';
import ContactListElement from '../../UI/ContactListElement/ContactListElement';

import useChatContext from '../../../hooks/context/useChatContext';
import useMessengerContext from '../../../hooks/context/useMessengerContext';
import useUIContext from '../../../hooks/context/useUIContext';

import styles from './ContactList.module.css';

const ContactList = () => {
	const { setIsContactListShow, isCreateGroupChatShow } = useMessengerContext();

	const {
		chatList,
		userContactList,
		setCurrentChatId,
		setChatWithUser,
		setGroupChat,
		setIsCurrentChatGroup,
	} = useChatContext();

	const {
		isChecked,
		setIsChecked,
		createGroupChat,
		createNewChat,
		groupChatName,
		setGroupChatName,
	} = useUIContext();

	const contactListClickHandler = (event: React.MouseEvent<HTMLElement>) => {
		if (isCreateGroupChatShow) {
			const userId = event.currentTarget.dataset.userId;

			if (userId) {
				if (userId in isChecked) {
					const newIsChecked = structuredClone(isChecked);

					delete newIsChecked[userId];
					setIsChecked(newIsChecked);
				} else {
					const newIsChecked = { ...isChecked };
					newIsChecked[userId] = true;
					setIsChecked(newIsChecked);
				}
			}
		} else {
			const chatId = event.currentTarget.dataset.chatId;

			if (chatId) {
				setIsContactListShow(false);

				setCurrentChatId(chatId);

				setIsCurrentChatGroup(false);
			} else {
				const userId = event.currentTarget.dataset.userId;
				if (userId) {
					createNewChat(userId);
				}
			}

			setChatWithUser(null);
			setGroupChat(null);
		}
	};

	return (
		<div className={styles.contacts}>
			{isCreateGroupChatShow ? (
				<>
					<input
						type='text'
						placeholder='Group chat name'
						value={groupChatName}
						onChange={(event) => setGroupChatName(event.target.value)}
					/>
					<Button
						onClick={createGroupChat}
						disabled={
							groupChatName.trim().length === 0 ||
							Object.keys(isChecked).length < 2
						}
					>
						Create group chat
					</Button>
				</>
			) : (
				<h3>Contacts</h3>
			)}
			{userContactList?.map((contact) => {
				return (
					<ContactListElement
						contact={contact}
						key={contact.id}
						dataChatId={
							chatList?.find(
								(chat) =>
									chat.isGroup === false && chat.login === contact.login,
							)?.chatId
						}
						data-user-id={contact.id}
						isCreateGroupChatShow={isCreateGroupChatShow}
						contactListClickHandler={contactListClickHandler}
						isChecked={isChecked[contact.id!] ? true : false}
					/>
				);
			})}
		</div>
	);
};

export default ContactList;
