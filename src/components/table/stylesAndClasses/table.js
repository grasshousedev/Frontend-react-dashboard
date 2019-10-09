import { SCROLLBAR_SIZE } from '../constants';


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
    });
    return cellsStyle;
}

export function getComponentContainerStyleAndClasses({ columns }) {
    const container = {
        style: {},
        classes: 'ui-table__container',
    };

    const allColumnsHaveWidth = columns.every(c => c.width !== undefined);

    if (allColumnsHaveWidth)
        container.style.maxWidth = `${columns.reduce((w, c) => w + c.width, 0) + SCROLLBAR_SIZE}px`;

    return container;
}
