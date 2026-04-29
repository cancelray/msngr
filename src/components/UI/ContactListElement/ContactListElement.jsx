import styles from './ContactListElement.module.css';

const ContactListElement = (props) => {
	const { contact, contactListClickHandler, dataChatId } = props;

	return (
		<div
			className={styles.contactListElement}
			onClick={contactListClickHandler}
			data-user-id={contact.id}
			data-chat-id={dataChatId}
		>
			{contact.avatar?.length > 0 ? (
				<img
					className={styles.avatar}
					src={contact.avatar}
					alt='avatar'
				></img>
			) : (
				<div className={styles.avatarAlt}>
					{contact.name ? contact.name[0] : ''}
				</div>
			)}
			<div className={styles.contact}>
				<p className={styles.name}>{contact.name + ' ' + contact.lastName}</p>
			</div>
		</div>
	);
};

export default ContactListElement;
