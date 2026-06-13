import { useCallback, useState } from 'react';

import chatsAPI from '../api/chatsAPI';

const useCreateChat = (
	loginUserId,
	setIsNewChatGroup,
	isContactListShow,
	setIsContactListShow,
	setCurrentChatId,
	setIsCreateGroupChatShow,
	setNewChatId,
	setIsCurrentChatGroup,
) => {
	const [isChecked, setIsChecked] = useState({});
	const [groupChatName, setGroupChatName] = useState('');

	const createNewChat = useCallback(
		(userId) => {
			setIsNewChatGroup(false);

			const newChat = {
				membersId: [loginUserId, userId],
				isGroup: false,
				name: '',
				chatImg: '',
			};

			chatsAPI
				.createNewChat(newChat)
				.then((newChatResp) => {
					setCurrentChatId(newChatResp.id);
					setNewChatId(newChatResp.id);

					if (isContactListShow) {
						setIsContactListShow(false);
					}
				})
				.catch((err) => alert(err));
		},
		[
			loginUserId,
			isContactListShow,
			setIsContactListShow,
			setNewChatId,
			setIsNewChatGroup,
			setCurrentChatId,
		],
	);

	const createGroupChat = useCallback(() => {
		setIsNewChatGroup(true);

		const usersInGroupChat = Object.getOwnPropertyNames(isChecked);

		if (usersInGroupChat.length < 2) {
			return;
		}

		usersInGroupChat.push(loginUserId);

		const newGroupChat = {
			membersId: usersInGroupChat,
			isGroup: true,
			name: groupChatName.trim(),
			chatImg: '',
			groupChatAdminId: loginUserId,
		};

		chatsAPI
			.createNewChat(newGroupChat)
			.then((newChatResp) => {
				setCurrentChatId(newChatResp.id);
				setNewChatId(newChatResp.id);

				setIsCurrentChatGroup(true);

				setIsCreateGroupChatShow(false);
				setIsContactListShow(false);
				setIsChecked({});
				setGroupChatName('');
			})
			.catch((err) => alert(err));
	}, [
		loginUserId,
		groupChatName,
		isChecked,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		setNewChatId,
		setCurrentChatId,
		setIsNewChatGroup,
		setIsCurrentChatGroup,
	]);

	return {
		createNewChat,
		createGroupChat,
		groupChatName,
		setGroupChatName,
		isChecked,
		setIsChecked,
	};
};

export default useCreateChat;
