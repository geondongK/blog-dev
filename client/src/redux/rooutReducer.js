import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
// import searchReducer from './slices/searchSlice';
// import commentSlice from './slices/commentSlice';
// import tokensSlice from './slices/tokenSlice';

const rootReducer = combineReducers({
    user: userReducer,
    // search: searchReducer,
    // comments: commentSlice,
    // token: tokensSlice,
});

export default rootReducer;
