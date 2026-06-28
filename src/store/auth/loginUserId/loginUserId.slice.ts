import { createSlice } from '@reduxjs/toolkit';

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
		setLoginUserId: (state, action) => {
			state.loginUserId = action.payload;
		},

		logoutUserId: (state) => {
			state.loginUserId = null;
		},
	},
});

export default loginUserIdSlice.reducer;

export const { setLoginUserId, logoutUserId } = loginUserIdSlice.actions;

