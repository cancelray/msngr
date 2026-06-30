import { createSlice } from '@reduxjs/toolkit';

import type { Chat } from '../../types/Chat.type';

export type currentChat = {
	currentChat: Chat[];
};

const initialState: currentChat = {
	currentChat: [],
};

const currentChatSlice = createSlice({
	name: 'currentChat',
	initialState,
	reducers: {
		setCurrentChat: (state, action: { payload: Chat[] }) => {
			state.currentChat = action.payload;
		},
		addNewMessageToChat: (state, action: { payload: Chat }) => {
			state.currentChat.push(action.payload);
		},
		closeCurrentChat: (state) => {
			state.currentChat = [];
		},
	},
});

export default currentChatSlice.reducer;

export const { setCurrentChat, addNewMessageToChat, closeCurrentChat } =
	currentChatSlice.actions;
