import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useContainerSizeForAutoWidth } from './effects';
import { getComponentContainerStyleAndClasses } from './stylesAndClasses/table';
import { getSearchConfig } from './utils/search';
import { TableWrapper } from './TableWrapper';


const DEFAULT_CONFIG = {
    padding: 7,
    borderType: 'row',
    headerController: true,
    headerContainerProps: {},
    bodyContainerProps: {},
    searchBar: true,
};

export function Table({ columns, entries, config, container, filters }) {
    const tableConfig = { ...DEFAULT_CONFIG, ...config };
    tableConfig.searchConfig = getSearchConfig(columns, tableConfig);

    const [tableStyleState, setTableStyleState] = useState({
        configured: false,
        expandableColumnWidth: null,
        bodyHasVericalScrollBar: false,
        bodyHasHorizontalScrollBar: false,
        totalWidth: 0,
        pinnedLeft: [...(tableConfig.pinnedLeft || [])],
        sortFields: [],
    });

    const componentContainerStyleAndClasses = getComponentContainerStyleAndClasses({ columns });

    const tableContainerRef = useRef(null);

    useContainerSizeForAutoWidth(tableContainerRef, columns, setTableStyleState, tableStyleState);

    return <div
        ref={tableContainerRef}
        className={componentContainerStyleAndClasses.classes}
        style={componentContainerStyleAndClasses.style}
    >
        {tableStyleState.configured &&
            <TableWrapper
                columns={columns}
                entries={entries}
                config={tableConfig}
                tableStyleState={tableStyleState}
                setTableStyleState={setTableStyleState}
                container={container}
                filters={filters}
            />
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
    filters: PropTypes.shape({
        initial: PropTypes.array,
    }),
};
