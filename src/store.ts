import { combineReducers, configureStore } from '@reduxjs/toolkit';

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
		auth: combineReducers({
			loginUserId: loginUserIdReducer,
			user: userReducer,
		}),
		chatList: combineReducers({
			chatList: chatListReducer,
			userChats: userChatsReducer,
		}),
		chat: combineReducers({
			currentChat: currentChatReducer,
			currentChatId: currentChatIdReducer,
			messages: messagesReducer,
		}),
		userContactListId: userContactListIdReducer,
	},
});

export default store;
