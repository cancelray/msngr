import { useContext } from 'react';
import { MessengerContext } from '../../../context/context';

import Contact from '../../UI/ChatListElement/ChatListElement';

import styles from './ChatList.module.css';

const Contacts = () => {
	const { userContactList, userChats } = useContext(MessengerContext);

	return (
		<div className={styles.chats}>
			{userContactList.map((contact) => (
				<Contact
					contact={contact}
					key={contact.id}
				/>
			))}
		</div>
	);
};

export default Contacts;
