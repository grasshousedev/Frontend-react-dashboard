export const CELL = {
    WIDTH: 150,
    HEIGHT: 21,
    PADDING_SIDE: 5,
    PADDING_TOP_BOTTOM: 5,
};

export function getDefaultCellHeight() {
    return CELL.HEIGHT + CELL.PADDING_TOP_BOTTOM * 2;
}

export const DEFAULTS = {
    CELL,
    getDefaultCellHeight
};
