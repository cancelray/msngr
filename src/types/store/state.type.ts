import type { users } from '../../store/users/users.slice';

import type { loginUserId } from '../../store/auth/loginUserId.slice';
import type { loginUser } from '../../store/auth/user.slice';

import type { chatList } from '../../store/chatList/chatList.slice';
import type { userChats } from '../../store/chatList/userChats.slice';

import type { currentChat } from '../../store/chat/currentChat.slice';
import type { currentChatId } from '../../store/chat/currentChatId.slice';
import type { messages } from '../../store/chat/messages.slice';

import type { userContactListId } from '../../store/userContactList/userContactListId.slice';

type auth = {
	loginUserId: loginUserId;
	user: loginUser;
};

type list = {
	chatList: chatList;
	userChats: userChats;
};

type chat = {
	currentChat: currentChat;
	currentChatId: currentChatId;
	messages: messages;
};

export interface State {
	users: users;
	auth: auth;
	chatList: list;
	chat: chat;
	userContactListId: userContactListId;
}
