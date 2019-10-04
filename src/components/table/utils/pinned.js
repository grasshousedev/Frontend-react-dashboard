export function togglePinnedColumn(setTableStyleState, field, isPinnedColumn) {
    setTableStyleState(ts => {
        return isPinnedColumn
            ? { ...ts, pinnedLeft: ts.pinnedLeft.filter(f => f !== field) }
            : { ...ts, pinnedLeft: [...ts.pinnedLeft, field] };
    });
};