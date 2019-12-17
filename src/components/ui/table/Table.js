import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { MainTable } from './MainTable';
import { PageController } from './PageController';
import { PinnedLeftTable } from './PinnedLeftTable';
import { StatusBar } from './StatusBar';
import { useScrollSync, useTableElements, useWindowSize } from './effects';
import { getComponentContainerStyleAndClasses, getColumnsStyle, getCellsStyle } from './stylesAndClasses/table';
import { getFooterContainerClass } from './stylesAndClasses/footer';
import { sortHandler } from './utils/sorting';

const DEFAULT_CONFIG = {
    padding: 7,
    borderType: 'row',
    headerController: true,
    headerContainerProps: {},
    bodyContainerProps: {},
};

export function Table({ columns, entries, config, container }) {
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
    const footerContainerClass = getFooterContainerClass();

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

    useTableElements(tableHeaderContainerRef, tableBodyContainerRef, columns, config, setTableStyleState, tableStyleState, windowWidth, container);

    const pinnedLeft = tableStyleState.pinnedLeft
        ? columns.filter(col => tableStyleState.pinnedLeft.includes(col.prop))
        : [];

    const pageController = { visible: true, style: 'collapsed', ...(tableConfig.pageController || {}) };
    const statusBarController = { visible: true, ...(tableConfig.statusBarController || {}) };

    const sortFunction = tableConfig.sortHandler || sortHandler;

    const filteredEntries = tableStyleState.sortFields.length > 0
        ? sortFunction(entries, tableStyleState.sortFields)
        : entries;

    const commonConfig = {
        config: tableConfig,
        commonStyles,
        tableStyleState,
        setTableStyleState,
        setScrollMaster,
        pageState
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
        {(statusBarController.visible || pageController.visible) &&
            <div className={footerContainerClass}>
                <div>
                    {statusBarController.visible && <StatusBar
                        config={{ ...tableConfig, statusBarController }}
                        pageState={pageState}
                        entries={filteredEntries}
                    />}
                </div>
                <div>
                    {pageController.visible && tableConfig.pagination && <PageController
                        config={{ ...tableConfig, pageController }}
                        pageState={pageState}
                        setPageState={setPageState}
                        totEntries={filteredEntries.length}
                    />}
                </div>
            </div>
        }
    </div>;
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            prop: PropTypes.string.isRequired,
            title: PropTypes.string,
            width: PropTypes.number,
            padding: PropTypes.number,
        }).isRequired,
    ).isRequired,
    entries: PropTypes.array.isRequired,
    config: PropTypes.shape({
        padding: PropTypes.number,
        singleLine: PropTypes.bool,
        borderType: PropTypes.oneOf([undefined, 'none', 'row', 'cell']),
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
        statusBarController: PropTypes.shape({
            visible: PropTypes.bool,
        }),
        bodyContainerProps: PropTypes.object,
        headerContainerProps: PropTypes.object,
        hideHeader: PropTypes.bool,
    }),
    container: PropTypes.object,
};
