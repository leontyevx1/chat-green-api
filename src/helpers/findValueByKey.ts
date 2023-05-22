export default function findValueByKey(obj: Record<string, any>, key: string): any {
    if (key in obj) {
        return obj[key];
    }

    for (let prop in obj) {
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
            const result = findValueByKey(obj[prop], key);
            if (result !== undefined) {
                return result;
            }
        }
    }

    return undefined;
}
