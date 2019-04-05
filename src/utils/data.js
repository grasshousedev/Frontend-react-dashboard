export function listToObject(list, getKey) {
    if (!Array.isArray(list)) {
        throw new Error('list - A list is required as first argument');
    }
    if (!getKey) {
        throw new Error('getKey - A function or a string is required as second argument');
    }
    
    if (list.length === 0) return {};

    const getKeyFunc = typeof getKey === 'function' ? getKey : (entry) => entry[getKey];

    return list.reduce((acc, entry) => {
        acc[getKeyFunc(entry)] = entry;
        return acc;
    }, {});
}