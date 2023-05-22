import { configureStore } from '@reduxjs/toolkit';
import entryFormSlice from '../features/entryForm/entryFormSlice';
import chatSlice from '../features/chat/chatSlice';

const reducer = {
    user: entryFormSlice,
    messages: chatSlice,
};

console.log(reducer)

export const store = configureStore({
    reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
