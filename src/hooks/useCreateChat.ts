import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import chatsAPI from '../api/chatsAPI';

import { selectLoginUserId } from '../store/auth/loginUserId.slice';
import { setCurrentChatId } from '../store/chat/currentChatId.slice';

import type { Check } from '../types/Check.type';

const useCreateChat = (
	setIsNewChatGroup: React.Dispatch<React.SetStateAction<boolean>>,
	isContactListShow: boolean,
	setIsContactListShow: React.Dispatch<React.SetStateAction<boolean>>,
	setIsCreateGroupChatShow: React.Dispatch<React.SetStateAction<boolean>>,
	setNewChatId: React.Dispatch<React.SetStateAction<string | null>>,
	setIsCurrentChatGroup: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const dispatch = useDispatch();

	const loginUserId = useSelector(selectLoginUserId);

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

			chatsAPI.createNewChat(newChat).then((newChatResp) => {
				setIsCurrentChatGroup(false);
				dispatch(setCurrentChatId(newChatResp.id));
				setNewChatId(newChatResp.id);

				if (isContactListShow) {
					setIsContactListShow(false);
				}
			});
		},
		[
			dispatch,
			loginUserId,
			isContactListShow,
			setIsContactListShow,
			setNewChatId,
			setIsNewChatGroup,
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

		chatsAPI.createNewChat(newGroupChat).then((newChatResp) => {
			dispatch(setCurrentChatId(newChatResp.id));
			setNewChatId(newChatResp.id);

			setIsCurrentChatGroup(true);

			setIsCreateGroupChatShow(false);
			setIsContactListShow(false);
			setIsChecked({});
			setGroupChatName('');
		});
	}, [
		dispatch,
		loginUserId,
		groupChatName,
		isChecked,
		setIsContactListShow,
		setIsCreateGroupChatShow,
		setNewChatId,
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
