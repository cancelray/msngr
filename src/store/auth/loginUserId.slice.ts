import { createSlice } from '@reduxjs/toolkit';

export type loginUserId = { loginUserId: string };

const getLoginUserId = () => {
	const loginId = localStorage.getItem('LoginUserId');
	return loginId ? loginId : null;
};

const loginUserIdSlice = createSlice({
	name: 'loginUserId',
	initialState: {
		loginUserId: getLoginUserId(),
	},
	reducers: {
		setLoginUserId: (state, action: {payload: string}) => {
			state.loginUserId = action.payload;
		},

		logoutUserId: (state) => {
			state.loginUserId = null;
		},
	},
});

export default loginUserIdSlice.reducer;

export const { setLoginUserId, logoutUserId } = loginUserIdSlice.actions;

