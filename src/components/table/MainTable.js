import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { getMainTableStylesAndClasses } from './stylesAndClasses/mainTable';


export function MainTable({ columns, config, entries, refs, commonStyles, tableStyleState, setTableStyleState, setScrollMaster, pagination, pinnedLeft}) {
    const mainTableStylesAndClasses = getMainTableStylesAndClasses({ tableStyleState });

    const commonConfig = {
        columns, config, pinnedLeft
    };

    return <div className={mainTableStylesAndClasses.container.classes}
        onMouseEnter={() => setScrollMaster(refs.tableBodyContainerRef)}
        onMouseLeave={() => setScrollMaster(null)}
    >
        <TableHeader
            stylesAndClasses={{ ...commonStyles, ...mainTableStylesAndClasses }}
            tableHeaderContainerRef={refs.tableHeaderContainerRef}
            tableStyleState={tableStyleState}
            setTableStyleState={setTableStyleState}
            { ...commonConfig }
        />
        <TableBody
            entries={entries}
            pagination={pagination}
            stylesAndClasses={{ ...commonStyles, ...mainTableStylesAndClasses }}
            tableBodyContainerRef={refs.tableBodyContainerRef}
            { ...commonConfig }
        />
    </div>;
}

MainTable.propTypes = {
    columns: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    entries: PropTypes.array.isRequired,
    refs: PropTypes.object.isRequired,
    commonStyles: PropTypes.object.isRequired,
    tableStyleState: PropTypes.object.isRequired,
    setTableStyleState: PropTypes.func.isRequired,
    setScrollMaster: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,

    pinnedLeft: PropTypes.array,
};
