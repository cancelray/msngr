import { configureStore } from '@reduxjs/toolkit';

import loginUserIdReducer from './store/auth/loginUserId/loginUserId.slice';
import userReducer from './store/auth/user/user.slice';

const store = configureStore({
	reducer: {
		user: userReducer,
		loginUserId: loginUserIdReducer,
	},
});

export default store;
