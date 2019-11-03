import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { MainTable } from './MainTable';
import { PageController } from './PageController';
import { PinnedLeftTable } from './PinnedLeftTable';
import { useScrollSync, useTableElements, useWindowSize } from './effects';
import { getComponentContainerStyleAndClasses, getColumnsStyle, getCellsStyle } from './stylesAndClasses/table';
import { sortHandler } from './utils/sorting';

const DEFAULT_CONFIG = {
    padding: 7,
    borderType: 'row',
    headerController: true,
};

export function Table({ columns, entries, config }) {
    const tableConfig = { ...DEFAULT_CONFIG, ...config };

    const [pageState, setPageState] = useState({ page: 1, pageSize: 20 });
    const [tableStyleState, setTableStyleState] = useState({
        expandableColumnWidth: null,
        bodyHasVericalScrollBar: false,
        bodyHasHorizontalScrollBar: false,
        totalWidth: 0,
        pinnedLeft: [...(tableConfig.pinnedLeft || [])],
        sortFields: [],
    });
    const [scrollMaster, setScrollMaster] = useState(null);
    const [shadowedPinnedLeft, setShadowedPinnedLeft] = useState(false);

    const commonStyles = {
        columns: { style: getColumnsStyle(columns, tableStyleState) },
        cells: { style: getCellsStyle(columns, tableStyleState, tableConfig) },
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

    const { width: windowWidth } = useWindowSize();

    useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState, tableStyleState, windowWidth);

    const pinnedLeft = tableStyleState.pinnedLeft
        ? columns.filter(col => tableStyleState.pinnedLeft.includes(col.prop))
        : [];

    const pageController = tableConfig.pageController || {};
    const sortFunction = tableConfig.sortHandler || sortHandler;

    const filteredEntries = tableStyleState.sortFields.length > 0
        ? sortFunction(entries, tableStyleState.sortFields)
        : entries;

    const commonConfig = {
        config: tableConfig, commonStyles, tableStyleState, setTableStyleState, setScrollMaster, pageState
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
        {pageController.visible && tableConfig.pagination && <PageController
            config={tableConfig}
            pageState={pageState}
            setPageState={setPageState}
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
        headerController: PropTypes.bool,
        verticalAlignment: PropTypes.oneOf([undefined, 'top', 'middle', 'bottom']),
        zebra: PropTypes.bool,
        pagination: PropTypes.bool,
        pageController: PropTypes.shape({
            visible: PropTypes.bool,
            style: PropTypes.oneOf(['collapsed', 'expanded'])
        }),
    }),
};
