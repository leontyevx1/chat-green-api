
type Instance = {
    id: string;
    token: string;
};


export default function customFetch(
    method: string,
    instance: Instance,
    options: object,
    id?: number
) {
    const notificationId = id ? `/${id}` : '';

    return new Promise((resolve, reject) => {
        fetch('https://api.green-api.com/waInstance' + instance.id + '/' + method + '/' + instance.token + notificationId, {...options,},)
            .then((response) => {
                if (response.status === 200) {
                    const result = response.json();
                    return result;
                } else {
                    reject(response.statusText);
                }
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}
