import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import Button from '../../UI/Button/Button';
import ContactListElement from '../../UI/ContactListElement/ContactListElement';

import styles from './ContactList.module.css';

const ContactList = () => {
	const {
		userContactList,
		userChats,
		setCurrentChatId,
		setIsContactListShow,
		createNewChat,
		setChatWithUser,
		setGroupChat,
		setIsCurrentChatGroup,
		isCreateGroupChatShow,
		createGroupChat,
		isChecked,
		setIsChecked,
		groupChatName,
		setGroupChatName,
	} = useContext(MessengerContext);

	const contactListClickHandler = (event) => {
		if (isCreateGroupChatShow) {
			const userId = event.currentTarget.dataset.userId;

			if (userId in isChecked) {
				const newIsChecked = structuredClone(isChecked);

				delete newIsChecked[userId];
				setIsChecked(newIsChecked);
			} else {
				const newIsChecked = { ...isChecked };
				newIsChecked[userId] = true;
				setIsChecked(newIsChecked);
			}
		} else {
			const chatId = event.currentTarget.dataset.chatId;

			if (chatId) {
				setIsContactListShow(false);
				setCurrentChatId(chatId);
				setIsCurrentChatGroup(false);
			} else {
				const userId = event.currentTarget.dataset.userId;
				createNewChat(userId);
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
						disabled={groupChatName.trim().length === 0}
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
						data-chat-id={
							userChats?.find(
								(chat) =>
									chat.membersId.length === 2 &&
									chat.membersId.includes(contact.id),
							)?.id
						}
						data-user-id={contact.id}
						isCreateGroupChatShow={isCreateGroupChatShow}
						contactListClickHandler={contactListClickHandler}
						isChecked={isChecked[contact.id] ? true : false}
					/>
				);
			})}
		</div>
	);
};

export default ContactList;
