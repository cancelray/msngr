import { createSlice } from '@reduxjs/toolkit';
import type { State } from '../../types/store/state.type';

export type currentChatId = {
	currentChatId: string | null;
};

const initialState: currentChatId = {
	currentChatId: null,
};

const currentChatIdSlice = createSlice({
	name: 'currentChatId',
	initialState,
	reducers: {
		setCurrentChatId: (state, action) => {
			state.currentChatId = action.payload;
		},
		closeChat: (state) => {
			state.currentChatId = null;
		},
	},
});

export default currentChatIdSlice.reducer;

export const selectCurrentChatId = (state: State) =>
	state.chat.currentChatId.currentChatId;

export const { setCurrentChatId, closeChat } = currentChatIdSlice.actions;
