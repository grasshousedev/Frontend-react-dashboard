import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { getPinnedLeftTableStylesAndClasses } from './stylesAndClasses/pinnedLeft';


export function PinnedLeftTable({ columns, config, entries, refs, commonStyles, tableStyleState, setTableStyleState, setScrollMaster, pagination, shadowedPinnedLeft }) {
    const pltStylesAndClasses = getPinnedLeftTableStylesAndClasses({ columns, tableStyleState, shadowedPinnedLeft });

    return  <div className={pltStylesAndClasses.container.classes}
        onMouseEnter={() => setScrollMaster(refs.pinnedLeftTableBodyContainerRef)}
        onMouseLeave={() => setScrollMaster(null)}
    >
        <TableHeader
            columns={columns}
            config={config}
            stylesAndClasses={{ ...commonStyles, ...pltStylesAndClasses }}
            tableHeaderContainerRef={refs.pinnedLeftTableHeaderContainerRef}
            tableStyleState={tableStyleState}
            setTableStyleState={setTableStyleState}
        />
        <div className={pltStylesAndClasses.body__outer_container.classes} style={pltStylesAndClasses.body__outer_container.style}>
            <TableBody
                columns={columns}
                entries={entries}
                config={config}
                pagination={pagination}
                stylesAndClasses={{ ...commonStyles, ...pltStylesAndClasses }}
                tableBodyContainerRef={refs.pinnedLeftTableBodyContainerRef}
            />
        </div>
    </div>;

}

PinnedLeftTable.propTypes = {
    columns: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    entries: PropTypes.array.isRequired,
    refs: PropTypes.object.isRequired,
    commonStyles: PropTypes.object.isRequired,
    tableStyleState: PropTypes.object.isRequired,
    setTableStyleState: PropTypes.func.isRequired,
    setScrollMaster: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,

    shadowedPinnedLeft: PropTypes.bool,
};
