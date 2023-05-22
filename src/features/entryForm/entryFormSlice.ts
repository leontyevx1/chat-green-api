import { createSlice } from '@reduxjs/toolkit';

type UserData = {
    id: string;
    token: string;
    phone: string;
    authorized: boolean;
};

const initialState: UserData = {
    id: '',
    token: '',
    phone: '',
    authorized: false,
};

const entryFormSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addUserData(state, { payload }) {
            const { id, token, phone } = payload;
            state.id = id;
            state.token = token;
            state.phone = phone;
        },
        toggleAuthorization(state) {
            state.authorized = !state.authorized;
        },
    },
});

export const { addUserData, toggleAuthorization } = entryFormSlice.actions;
export default entryFormSlice.reducer;
