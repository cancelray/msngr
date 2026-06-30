import { createSlice } from '@reduxjs/toolkit';

import type { User } from '../../types/User.type';
import type { State } from '../../types/store/state.type';

export type loginUser = { user: User | null };

const initialState: loginUser = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: { payload: User }) {
			state.user = action.payload;
		},

		logout(state) {
			state.user = null;
		},
	},
});

export default userSlice.reducer;

export const selectUser = (state: State) => state.auth.user.user;

export const { setUser, logout } = userSlice.actions;
