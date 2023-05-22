/* eslint-disable react-hooks/exhaustive-deps */
import {
    ChatContainer,
    MainContainer,
    MessageInput,
    MessageList,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import findValueByKey from '../../helpers/findValueByKey';
import useCustomFetch from '../../hooks/useCustomFetch/useCustomFetch';
import { toggleAuthorization } from '../entryForm/entryFormSlice';
import './Chat.css';
import ChatMessage from './chatMessage/ChatMessage';
import { addMessage } from './chatSlice';

type Notification = {
    receiptId: number;
    body: {
        typeWebhook: string;
        idMessage?: string;
        messageData?: {
            extendedTextMessageData: {
                text: string;
            };
            textMessageData: {
                textMessage: string;
            };
        };
        timestamp: number;
        stateInstance?: string;
    };
};

type DeleteNotification = {
    result: boolean;
};

export default function Chat() {
    const [notificationHandling, setNotificationHandling] = useState(false);
    const user = useAppSelector((store) => store.user);
    const messages = useAppSelector((store) => store.messages);
    const dispatch = useAppDispatch();
    const { sendText, getNotification, deleteNotification } = useCustomFetch();

    const instance = {
        id: user.id,
        token: user.token
    };

    const handleNotification = async (notification: Notification) => {
        if (notificationHandling || notification === null || !notification.hasOwnProperty('body')) {
            return;
        }

        setNotificationHandling(true);

        let type = notification.body.typeWebhook;

        if (type === 'outgoingAPIMessageReceived') {
            type = 'outgoing';
        } else if (type === 'outgoingMessageReceived') {
            type = 'incoming';
        } else if (
            type === 'stateInstanceChanged' &&
            notification.body.stateInstance !== 'authorized'
        ) {
            dispatch(toggleAuthorization());

            return;
        } else {
            return;
        }

        const response = (await deleteNotification(
            instance,
            notification.receiptId,
        )) as DeleteNotification;

        if (response.result || response === null) {
            dispatch(
                addMessage({
                    id: notification.body.idMessage,
                    text: findValueByKey(notification, 'text'),
                    textMessage: findValueByKey(notification, 'textMessage'),
                    timestamp: notification.body.timestamp,
                    type: type,
                }),
            );

            setNotificationHandling(false);
        }
    };

    useEffect(() => {
        if (!notificationHandling) {
            console.log(notificationHandling)
            const checkIncomingMessages = async () => {
                try {
                    const notification = (await getNotification(instance)) as Notification;

                    if (
                        notification
                    ) {
                        await handleNotification(notification);
                    }
                } catch (error) {
                    console.error('Ошибка: ', error);
                }
            };

            const intervalId = setInterval(checkIncomingMessages, 5000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, []);

    const handleSubmit = async (text: string) => {
        try {
            let notification;

            await sendText(instance, text, user.phone);

            notification = (await getNotification(instance)) as Notification;

            if (
                !notificationHandling
            ) {
                await handleNotification(notification);
            }
        } catch (error) {
            console.error('Ошибка: ', error);
        }
    };

    return (
        <div className="wrapper">
            <MainContainer className="main-container">
                <ChatContainer className="chat-container">
                    <MessageList className="message-list">
                        <MessageList.Content>
                            {messages.map(({ id, text, timestamp, textMessage, type }) => {
                                return (
                                    <ChatMessage
                                        key={id}
                                        textMessage={textMessage}
                                        text={text}
                                        timestamp={timestamp}
                                        type={type}
                                    />
                                );
                            })}
                        </MessageList.Content>
                    </MessageList>
                    <MessageInput
                        className="message-input"
                        onSend={handleSubmit}
                        attachButton={false}
                        sendButton={false}
                        placeholder="Введите сообщение"
                        autoFocus
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}
