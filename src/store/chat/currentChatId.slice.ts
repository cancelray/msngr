import { createSlice } from '@reduxjs/toolkit';

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

export const { setCurrentChatId, closeChat } = currentChatIdSlice.actions;
