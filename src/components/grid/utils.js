import { DEFAULTS } from './constants';

export function calculateColumnWidth(column, { columnsWidth,  /* sortableColumns */ }) {
    return columnsWidth[column] || DEFAULTS.CELL.WIDTH;
}

export function getScrollSize() {
    return 17;
}