import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

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
		setisCurrentChatGroup,
	} = useContext(MessengerContext);

	const contactListClickHandler = (event) => {
		const chatId = event.currentTarget.dataset.chatId;

		if (chatId) {
			setIsContactListShow(false);
			setCurrentChatId(chatId);
			setisCurrentChatGroup(false);
		} else {
			const userId = event.currentTarget.dataset.userId;
			createNewChat(userId);
		}

		setChatWithUser(null);
		setGroupChat(null);
	};

	return (
		<div className={styles.contacts}>
			<h3>Contacts</h3>
			{userContactList?.map((contact) => (
				<ContactListElement
					contact={contact}
					key={contact.id}
					dataChatId={
						userChats?.find(
							(chat) =>
								chat.membersId.length === 2 &&
								chat.membersId.includes(contact.id),
						)?.id
					}
					contactListClickHandler={contactListClickHandler}
				/>
			))}
		</div>
	);
};

export default ContactList;
