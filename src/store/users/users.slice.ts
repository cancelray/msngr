import { createSlice } from '@reduxjs/toolkit';

import type { User } from '../../types/User.type';
import type { State } from '../../types/store/state.type';

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

export const selectUsers = (state: State) => state.users.users;

export const { setUsers } = usersSlice.actions;
