import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
// import commentSlice from './slices/commentSlice';
// import tokensSlice from './slices/tokenSlice';

const rootReducer = combineReducers({
    user: userReducer,
    // comments: commentSlice,
    // token: tokensSlice,
});

export default rootReducer;
