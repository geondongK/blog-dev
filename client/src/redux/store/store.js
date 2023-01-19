// /*
//     Reducer 사용법.
//     "react", "react-dom" 버전 18.1.x 이상 사용가능.
//     업데이트 방법 package.json 18.1.x 수정 후 npm install 후 redux 설치가능.
// */
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
// import logger from 'redux-logger';
// localStorage
import storage from 'redux-persist/lib/storage';
// sessionStorage
// import sessionStorage from 'redux-persist/es/storage/session';
import rootReducer from '../rooutReducer';

const persistConfig = {
    key: 'root',
    varsion: 1,
    storage,
    // blacklist: ['comments'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // reducer: {
    //     user: persistedReducer,
    //     // token: tokenReducer
    // },
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    // }).concat(logger),
});

export default store;
export const persistor = persistStore(store);
