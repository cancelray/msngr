import { createSlice } from '@reduxjs/toolkit';

import type { Chat } from '../../types/Chat.type';
import type { State } from '../../types/store/state.type';

export type userChats = {
	userChats: Chat[];
};

const initialState: userChats = {
	userChats: [],
};

const userChatsSlice = createSlice({
	name: 'userChats',
	initialState,
	reducers: {
		setUserChats(state, action: { payload: Chat[] }) {
			state.userChats = action.payload;
		},
	},
});

export default userChatsSlice.reducer;

export const selectUserChats = (state: State) =>
	state.chatList.userChats.userChats;

export const { setUserChats } = userChatsSlice.actions;
