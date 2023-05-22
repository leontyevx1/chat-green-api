import { createSlice } from '@reduxjs/toolkit';

type Message = {
    id: string;
    text: string;
    textMessage: string,
    timestamp: number;
    type: 'incoming' | 'outgoing';
};

const initialState: Array<Message> =[];

const chatSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addMessage(state, { payload }) {
            const isMessage = state.find((message) => message.id === payload.id);

            if (isMessage) {
                return;
            }

            state.push(payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
