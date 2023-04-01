import { rootReducer } from './reducers';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    reducer: rootReducer,
    devTools: process.env.REACT_APP_NODE_ENV !== 'production',
});