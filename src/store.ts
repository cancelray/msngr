import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './store/users/users.slice';

import loginUserIdReducer from './store/auth/loginUserId.slice';
import userReducer from './store/auth/user.slice';

import chatListReducer from './store/chatList/chatList.slice';
import userChatsReducer from './store/chatList/userChats.slice';

import currentChatReducer from './store/chat/currentChat.slice';
import currentChatIdReducer from './store/chat/currentChatId.slice';
import messagesReducer from './store/chat/messages.slice';

import userContactListIdReducer from './store/userContactList/userContactListId.slice';

const store = configureStore({
	reducer: {
		users: usersReducer,
		messages: messagesReducer,
		loginUserId: loginUserIdReducer,
		user: userReducer,
		chatList: chatListReducer,
		userChats: userChatsReducer,
		currentChatId: currentChatIdReducer,
		currentChat: currentChatReducer,
		userContactListId: userContactListIdReducer,
	},
});

export default store;
