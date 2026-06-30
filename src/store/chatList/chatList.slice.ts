import { createSlice } from '@reduxjs/toolkit';

import type { ChatListItem } from '../../types/Chat.type';

export type chatList = {
	chatList: ChatListItem[];
};

const initialState: chatList = {
	chatList: [],
};

const chatListSlice = createSlice({
	name: 'chatList',
	initialState,
	reducers: {
		setChatList: (state, action: { payload: ChatListItem[] }) => {
			state.chatList = action.payload;
		},
	},
});

export default chatListSlice.reducer;

export const { setChatList } = chatListSlice.actions;
