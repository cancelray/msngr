import { createSlice } from '@reduxjs/toolkit';

import type { Message } from '../../types/Message.type';

export type messages = { messages: Message[] };

const initialState: messages = {
	messages: [],
};

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessages(state, action: { payload: Message[] }) {
			state.messages = action.payload;
		},
		addNewMessage(state, action: { payload: Message }) {
			state.messages.push(action.payload);
		},
	},
});

export default messagesSlice.reducer;

export const { setMessages, addNewMessage } = messagesSlice.actions;
