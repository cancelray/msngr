import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import chatsAPI from '../api/chatsAPI';

import type { Check } from '../types/Check.type';
import type { State } from '../types/store/state.type';

const useCreateChat = (
	setIsNewChatGroup: React.Dispatch<React.SetStateAction<boolean>>,
	isContactListShow: boolean,
	setIsContactListShow: React.Dispatch<React.SetStateAction<boolean>>,
	setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>,
	setIsCreateGroupChatShow: React.Dispatch<React.SetStateAction<boolean>>,
	setNewChatId: React.Dispatch<React.SetStateAction<string | null>>,
	setIsCurrentChatGroup: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const loginUserId = useSelector(
		(state: State) => state.loginUserId?.loginUserId,
	);

	const [isChecked, setIsChecked] = useState<Check>({});
	const [groupChatName, setGroupChatName] = useState<string>('');

	const createNewChat = useCallback(
		(userId: string) => {
			setIsNewChatGroup(false);

			const newChat = {
				id: '',
				membersId: [loginUserId, userId],
				isGroup: false,
				avatar: '',
				name: '',
				chatImg: '',
				createdAt: '',
				lastMessageTime: 0,
			};

			chatsAPI
				.createNewChat(newChat)
				.then((newChatResp) => {
					setIsCurrentChatGroup(false);
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
			setIsCurrentChatGroup,
		],
	);

	const createGroupChat = useCallback(() => {
		setIsNewChatGroup(true);

		const usersInGroupChat = Object.getOwnPropertyNames(isChecked);

		if (usersInGroupChat.length < 2) {
			return;
		}

		if (loginUserId) {
			usersInGroupChat.push(loginUserId);
		}

		const newGroupChat = {
			id: '',
			membersId: usersInGroupChat,
			isGroup: true,
			name: groupChatName.trim(),
			chatImg: '',
			groupChatAdminId: loginUserId,
			createdAt: '',
			avatar: '',
			lastMessageTime: 0,
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
