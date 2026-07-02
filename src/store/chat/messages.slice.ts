import { createSlice } from '@reduxjs/toolkit';

import type { Message } from '../../types/Message.type';
import type { State } from '../../types/store/state.type';

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

export const selectMessages = (state: State) => state.chat.messages.messages;

export const { setMessages, addNewMessage } = messagesSlice.actions;
