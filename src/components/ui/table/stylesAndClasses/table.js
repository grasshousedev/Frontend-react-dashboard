import { SCROLLBAR_SIZE } from '../constants';

export const TABLE_CLASS = 'ui-table';
const TABLE_CONTAINER_CLASS = `${TABLE_CLASS}__container`;


export function getColumnsStyle(columns, tableStyleState) {
    const columnsStyle = {};
    columns.forEach(col => {
        columnsStyle[col.prop] = {};
        if (col.width) {
            columnsStyle[col.prop].width = col.width + 'px';
        } else if (tableStyleState.expandableColumnWidth) {
            columnsStyle[col.prop].width = tableStyleState.expandableColumnWidth + 'px';
        }
    });
    return columnsStyle;
}

export function getCellsStyle(columns, tableStyleState, config) {
    const cellsStyle = {};
    columns.forEach(col => {
        cellsStyle[col.prop] = {};
        if (col.width) {
            cellsStyle[col.prop].maxWidth = (col.width - 5) + 'px';
        } else if (tableStyleState.expandableColumnWidth) {
            cellsStyle[col.prop].maxWidth = (tableStyleState.expandableColumnWidth - 5) + 'px';
        }
        if (config.padding) {
            cellsStyle[col.prop].padding = config.padding + 'px';
        }
        if (col.padding !== undefined) {
            cellsStyle[col.prop].padding = col.padding + 'px';
        }
        if (col.style) {
            cellsStyle[col.prop] = { ...cellsStyle[col.prop], ...col.style };
        }
    });
    return cellsStyle;
}

export function getComponentContainerStyleAndClasses({ columns }) {
    const container = {
        style: {},
        classes: TABLE_CONTAINER_CLASS,
    };

    const allColumnsHaveWidth = columns.every(c => c.width !== undefined);

    if (allColumnsHaveWidth)
        container.style.maxWidth = `${columns.reduce((w, c) => w + c.width, 0) + SCROLLBAR_SIZE}px`;

    return container;
}
