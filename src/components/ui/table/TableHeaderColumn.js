import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { DropDown } from '../DropDown';
import { Icon } from '../Icon';

import { UI_TABLE_BASE_CLASS } from './constants';
import { useHover } from './effects';
import { getColClass, getColStyle, getCellClass } from './stylesAndClasses/tableHeaderColumn';
import { setSortDirection } from './utils/sorting';
import { togglePinnedColumn } from './utils/pinned';

const HEADER_CLASS = `${UI_TABLE_BASE_CLASS}__header`;
const COL_CLASS = `${HEADER_CLASS}__col`;
const CELL_CLASS = `${HEADER_CLASS}__cell`;
const ICON_SORT_DESC = 'keyboard_arrow_down';
const ICON_SORT_ASC = 'keyboard_arrow_up';
const ICON_CONTROL = 'settings';


export function TableHeaderColumn({ col, stylesAndClasses, tableStyleState, setTableStyleState, sortedFields, isPinned, config }) {
    const colRef = useRef(null);
    const isHovered = useHover(colRef);

    const colClass = getColClass(COL_CLASS, stylesAndClasses.col.classes, { isHovered });
    const colStyle = getColStyle(stylesAndClasses.col.style, { isPinned });
    const cellClass = getCellClass(CELL_CLASS, stylesAndClasses.cell.classes, { isHovered });
    const cellStyle = stylesAndClasses.cell.style;

    const sortIconName = sortedFields[col.prop] === 'desc' ? ICON_SORT_DESC : ICON_SORT_ASC;
    const controlsStyle = { height: 16, display: isHovered ? 'inline-flex' : 'none' };

    // isPinned means that the column is pinned in the current table
    // isPinnedColumn means that the column is pinned globally, used to show unpin/pin options
    const isPinnedColumn = tableStyleState.pinnedLeft.includes(col.prop);

    return <th ref={colRef} className={colClass} style={colStyle}>
        <span className={cellClass} style={cellStyle}>
            <span>
                {col.title}
            </span>
            {sortedFields[col.prop] &&
                <span className={`${COL_CLASS}__order`}>
                    <Icon size="smaller" modifier="pointer" name={sortIconName} />
                </span>
            }
            {config.headerController && <span className={`${COL_CLASS}__controls`} style={controlsStyle}>
                <span className={`${COL_CLASS}__controls__control`}>
                    <DropDown trigger={<Icon size="smaller" modifier="pointer" name={ICON_CONTROL} />}>
                        <DropDown.Entry onClick={() => setSortDirection(setTableStyleState, col.prop, 'asc')}>
                            Sort Ascending
                        </DropDown.Entry>
                        <DropDown.Entry onClick={() => setSortDirection(setTableStyleState, col.prop, 'desc')}>
                            Sort Descending
                        </DropDown.Entry>
                        <DropDown.Divider />
                        <DropDown.Entry onClick={() => togglePinnedColumn(setTableStyleState, col.prop, isPinnedColumn)}>
                            {isPinnedColumn ? 'Unpin column' : 'Pin Left'}
                        </DropDown.Entry>
                    </DropDown>
                </span>
            </span>}
        </span>
    </th>;
}

TableHeaderColumn.propTypes = {
    col: PropTypes.object.isRequired,
    stylesAndClasses: PropTypes.object.isRequired,
    tableStyleState: PropTypes.object.isRequired,
    setTableStyleState: PropTypes.func.isRequired,
    sortedFields: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,

    isPinned: PropTypes.bool,
};
