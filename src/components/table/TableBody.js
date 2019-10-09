import React from 'react';
import PropTypes from 'prop-types';

import { UI_TABLE_BASE_CLASS } from './constants';
import { getBodyContainerStyle, getBodyColClass, getBodyCellClass } from './stylesAndClasses/tableBody';

const BODY_CLASS = `${UI_TABLE_BASE_CLASS}__body`;
const ROW_CLASS = `${BODY_CLASS}__row`;
const COL_CLASS = `${BODY_CLASS}__col`;
const CELL_CLASS = `${BODY_CLASS}__cell`;


export default function TableBody({ columns, entries, config, pageState, stylesAndClasses, tableBodyContainerRef, pinnedLeft=[] }) {
    const firstElement = (pageState.page - 1) * pageState.pageSize;
    const lastElement = firstElement + pageState.pageSize;
    const entriesPage = config.pagination ? entries.slice(firstElement, lastElement) : entries;

    const bodyContainerStyle = getBodyContainerStyle(config);

    return <div className={stylesAndClasses.body__container.classes} ref={tableBodyContainerRef} style={bodyContainerStyle}>
        <table className={BODY_CLASS} style={stylesAndClasses.body.style}>
            <tbody>
                {entriesPage.map((entry, eIndex) => {
                    const evenOrOdd = eIndex % 2 === 0 ? 'even' : 'odd';
                    const colClass = getBodyColClass(COL_CLASS, { config, evenOrOdd });
                    const cellClass = getBodyCellClass(CELL_CLASS, { config });

                    return <tr key={eIndex} className={ROW_CLASS}>
                        {pinnedLeft.map(col => {
                            return <td key={`table-body-row-${eIndex}-col-${col.prop}-hidden-pinned-left`}
                                className={`${colClass} ${COL_CLASS}--pinned-outside`}
                                style={stylesAndClasses.columns.style[col.prop]}
                            >
                            </td>;
                        })}
                        {columns.filter(col => !pinnedLeft.includes(col)).map(col => {
                            return <td key={`table-body-row-${eIndex}-col-${col.prop}`}
                                className={colClass}
                                style={stylesAndClasses.columns.style[col.prop]}
                            >
                                <span className={cellClass} style={stylesAndClasses.cells.style[col.prop]}>
                                    {entry[col.prop]}
                                </span>
                            </td>;
                        })}
                    </tr>;
                })}
            </tbody>
        </table>
    </div>;
}

TableBody.propTypes = {
    columns: PropTypes.array.isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    pageState: PropTypes.object.isRequired,
    stylesAndClasses: PropTypes.object.isRequired,
    tableBodyContainerRef: PropTypes.object.isRequired,
    pinnedLeft: PropTypes.array,
};
