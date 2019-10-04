import { UI_TABLE_BASE_CLASS } from '../constants';

const MAIN_TABLE_CONTAINER_CLASS = `${UI_TABLE_BASE_CLASS}__main-table__container`;
const BODY_CONTAINER_CLASS = `${UI_TABLE_BASE_CLASS}__body__container`;
const HEADER_CONTAINER_CLASS = `${UI_TABLE_BASE_CLASS}__header__container`;


export function getMainTableStylesAndClasses({ tableStyleState }) {
    const elems = {
        container: { classes: MAIN_TABLE_CONTAINER_CLASS },
        header__container: { classes: '', },
        header: { style: {}, },
        body__container: { classes: BODY_CONTAINER_CLASS },
        body: { style: {}, },
    };

    if (tableStyleState.bodyHasHorizontalScrollBar)
        elems.header__container.classes += ` ${HEADER_CONTAINER_CLASS}--body-has-horizontal-scrollbar`;

    elems.header.style.width = tableStyleState.totalWidth + 'px';
    elems.header.style.display = 'block';

    elems.body.style.width = tableStyleState.totalWidth + 'px';
    elems.body.style.display = 'block';

    return elems;
}
