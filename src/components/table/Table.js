import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { MainTable } from './MainTable';
import { PageController } from './PageController';
import { PinnedLeftTable } from './PinnedLeftTable';
import { useScrollSync, useTableElements } from './effects';
import { getComponentContainerStyleAndClasses, getColumnsStyle, getCellsStyle } from './stylesAndClasses/table';
import { sortHandler } from './utils/sorting';


export function Table({ columns, entries, config={} }) {
    const [pagination, setPagination] = useState({ page: 1, pageSize: 20 });
    const [tableStyleState, setTableStyleState] = useState({
        expandableColumnWidth: null,
        bodyHasVericalScrollBar: false,
        bodyHasHorizontalScrollBar: false,
        totalWidth: 0,
        pinnedLeft: [...(config.pinnedLeft || [])],
        sortFields: [],
    });
    const [scrollMaster, setScrollMaster] = useState(null);
    const [shadowedPinnedLeft, setShadowedPinnedLeft] = useState(false);

    const commonStyles = {
        columns: { style: getColumnsStyle(columns, tableStyleState, config) },
        cells: { style: getCellsStyle(columns, tableStyleState, config) },
    };

    const componentContainerStyleAndClasses = getComponentContainerStyleAndClasses({ columns });

    const tableContainerRef = useRef(null);
    const tableHeaderContainerRef = useRef(null);
    const tableBodyContainerRef = useRef(null);
    const pinnedLeftTableHeaderContainerRef = useRef(null);
    const pinnedLeftTableBodyContainerRef = useRef(null);

    useScrollSync(tableBodyContainerRef, [tableHeaderContainerRef], scrollMaster, { scrollLeft: true },
        (scroll) => setShadowedPinnedLeft(scroll !== 0));
    useScrollSync(tableBodyContainerRef, [pinnedLeftTableBodyContainerRef], scrollMaster, { scrollTop: true });
    useScrollSync(pinnedLeftTableBodyContainerRef, [tableBodyContainerRef], scrollMaster, { scrollTop: true });

    useTableElements(tableContainerRef, tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState);

    const pinnedLeft = tableStyleState.pinnedLeft
        ? columns.filter(col => tableStyleState.pinnedLeft.includes(col.prop))
        : [];

    const pageController = config.pageController || {};
    const sortFunction = config.sortHandler || sortHandler;

    const filteredEntries = tableStyleState.sortFields.length > 0
        ? sortFunction(entries, tableStyleState.sortFields)
        : entries;

    const commonConfig = {
        config, commonStyles, tableStyleState, setTableStyleState, setScrollMaster, pagination
    };

    return <div
        ref={tableContainerRef}
        className={componentContainerStyleAndClasses.classes}
        style={componentContainerStyleAndClasses.style}
    >
        <MainTable
            columns={columns}
            entries={filteredEntries}
            refs={{ tableHeaderContainerRef, tableBodyContainerRef }}
            { ...commonConfig }
            pinnedLeft={pinnedLeft}
        />
        {pinnedLeft.length > 0 &&
            <PinnedLeftTable
                columns={pinnedLeft}
                entries={filteredEntries}
                refs={{ pinnedLeftTableHeaderContainerRef, pinnedLeftTableBodyContainerRef }}
                { ...commonConfig }
                shadowedPinnedLeft={shadowedPinnedLeft}
            />
        }
        {pageController.visible && <PageController
            config={config}
            pagination={pagination}
            setPagination={setPagination}
            totEntries={filteredEntries.length}
        />}
    </div>;
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            prop: PropTypes.string.isRequired,
            title: PropTypes.string,
        }).isRequired,
    ).isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.shape({
        padding: PropTypes.number,
        singleLine: PropTypes.bool,
        borderType: PropTypes.oneOf([undefined, 'row', 'cell']),
        height: PropTypes.number,
        pinnedLeft: PropTypes.arrayOf(PropTypes.string),
        zebra: PropTypes.bool,
        pageController: PropTypes.shape({
            visible: PropTypes.bool,
            style: PropTypes.oneOf(['collapsed', 'expanded'])
        }),
    }),
};

