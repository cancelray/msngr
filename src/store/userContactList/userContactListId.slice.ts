import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { Contact } from '../../types/Contact.type';
import type { State } from '../../types/store/state.type';

export type userContactListId = {
	userContactListId: Contact[];
};

const initialState: userContactListId = {
	userContactListId: [],
};

const userContactListIdSlice = createSlice({
	name: 'userContactListId',
	initialState,
	reducers: {
		setUserContactListId: (state, action: { payload: Contact[] }) => {
			state.userContactListId = action.payload;
		},
		addNewContact: (state, action: { payload: Contact }) => {
			state.userContactListId.push(action.payload);
		},
	},
});

export const selectUserContactList = createSelector(
	[
		(state: State) => state.userContactListId.userContactListId,
		(state: State) => state.users.users,
	],
	(userContactListId, users) => {
		return userContactListId
			.flatMap((contact) => {
				const user = users.find((user) => user.id == contact.contactId);
				return user ? [user] : [];
			})
			.sort((a, b) => a.name.localeCompare(b.name));
	},
);

export default userContactListIdSlice.reducer;

export const { setUserContactListId, addNewContact } =
	userContactListIdSlice.actions;
