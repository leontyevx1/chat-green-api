import customFetch from './customFetch';

type Instance = {
    id: string;
    token: string;
};

export default function useCustomFetch() {
    function getSettings(instance: Instance) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        return customFetch(
            'getSettings',
            instance,
            requestOptions,
        );
    }

    function getStateInstance(instance: Instance) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        return customFetch(
            'getStateInstance',
            instance,
            requestOptions,
        );
    }

    function setSettings(instance: Instance, settings: object) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(settings),
            redirect: 'follow',
        };

        return customFetch(
            'setSettings',
            instance,
            requestOptions,
        );
    }

    function sendText(instance: Instance, message: string, phone: string) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            chatId: `${phone}@c.us`,
            message: message,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        return customFetch(
            'sendMessage',
            instance,
            requestOptions,
        );
    }

    function getNotification(instance: Instance) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        return customFetch(
            'receiveNotification',
            instance,
            requestOptions,
        );
    }

    function deleteNotification(instance: Instance, notificationId: number) {
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        };

        return customFetch(
            'deleteNotification',
            instance,
            requestOptions,
            notificationId,
        );
    }

    return {
        getSettings,
        getStateInstance,
        setSettings,
        sendText,
        getNotification,
        deleteNotification,
    };
}
