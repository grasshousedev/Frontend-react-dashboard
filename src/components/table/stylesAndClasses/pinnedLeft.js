import { UI_TABLE_BASE_CLASS } from '../constants';


const CONTAINER_CLASS = `${UI_TABLE_BASE_CLASS}__pinned-left__container`;
const BODY_OUTER_CONTAINER_CLASS = `${UI_TABLE_BASE_CLASS}__pinned-left__body__outer-container`;
const BODY_CONTAINER_CLASS = `${UI_TABLE_BASE_CLASS}__pinned-left__body__container`;

export function getPinnedLeftTableStylesAndClasses({ columns, tableStyleState, shadowedPinnedLeft }) {
    const elems = {
        container: { classes: CONTAINER_CLASS },
        header: { style: {}, },
        header__container: { style: {}, },
        body: { style: {}, },
        body__outer_container: { classes: BODY_OUTER_CONTAINER_CLASS, style: {}, },
        body__container: { classes: BODY_CONTAINER_CLASS },
    };

    const totWidth = columns.reduce((tot, col) => tot + col.width, 0) + 'px';

    if (shadowedPinnedLeft)
        elems.container.classes += ` ${CONTAINER_CLASS}--shadowed`;

    elems.header.style.width = totWidth;

    elems.header__container.style.width = totWidth;

    elems.body.style.width = totWidth;

    if (tableStyleState.bodyHasHorizontalScrollBar)
        elems.body__outer_container.style.marginBottom = '-15px';

    if (tableStyleState.bodyHasHorizontalScrollBar)
        elems.body__container.classes += ` ${BODY_CONTAINER_CLASS}--with-scroll`;

    return elems;
}
