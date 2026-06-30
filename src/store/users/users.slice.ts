import { createSlice } from '@reduxjs/toolkit';

import type { User } from '../../types/User.type';

export type users = { users: User[] };

const initialState: users = {
	users: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers(state, action: { payload: User[] }) {
			state.users = action.payload;
		},
	},
});

export default usersSlice.reducer;

export const { setUsers } = usersSlice.actions;
