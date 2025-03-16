export const cacheData = (key: string, data: object) => {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: new Date().getTime() }));
};

export const getCachedData = (key: string) => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const oneHour = 60 * 60 * 1000;
        if (new Date().getTime() - parsedData.timestamp < oneHour) {
            return parsedData.data;
        }
    }
    return null;
};