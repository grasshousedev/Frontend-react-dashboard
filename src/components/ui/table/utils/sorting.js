export function sortHandler(entries, props) {
    const sortWithProps = (a, b) => compareByProperties(a, b, props);

    return entries.sort(sortWithProps);
}

function compareByProperties(a, b, props) {
    if (!props || props.length === 0) return 0;
    const prop1 = props[0];
    const [dir1, dir2] = prop1.direction === 'desc' ? [-1, 1] : [1, -1];

    return a[prop1.field] > b[prop1.field]
        ? dir1
        : a[prop1.field] < b[prop1.field]
            ? dir2
            : compareByProperties(a, b, props.slice(1));
}

export function setSortDirection(setTableStyleState, field, direction) {
    setTableStyleState(ts => ({
        ...ts, sortFields: [{ field, direction }]
    }));
};
