import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid as VirtualizedGrid, ScrollSync } from 'react-virtualized';

import { DEFAULTS } from './constants';
import { calculateColumnWidth } from './utils';

export class GridSection extends Component {
    constructor(props) {
        super(props);

        this.header = React.createRef();
        this.body = React.createRef();
    }

    getColumnWidth = (column) => {
        const { columnsWidth, sortableColumns } = this.props;

        return calculateColumnWidth(column, { columnsWidth, sortableColumns });
    }

    getRowSpacer(position) {
        const { calculatedWidths, scrollBarsSize, renderer } = this.props;

        if (!calculatedWidths[position]) return '';
        let width = calculatedWidths[position];
        if (position === 'right') {
            width += scrollBarsSize.vertical;
        }
        if (renderer === 'string') {
            return `<div class="grid__cell" style="width: ${width}px"></div>`;
        }
        if (renderer === 'jsx') {
            return <div className="grid__cell" style={{ width: `${width}px` }} />;
        }
    }

    generateHeaderString = () => {
        const { columns, columnsLabel, section } = this.props;

        const cols = columns.map(column => {
            const width = this.getColumnWidth(column);
            const name = columnsLabel && columnsLabel.hasOwnProperty(column)
                ? columnsLabel[column] : getColumnName(column);
            return `<div class="grid__cell" style="width: ${width}px">${name}</div>`;
        }).join('');

        if (section === 'main') return `${this.getRowSpacer('left')}${cols}${this.getRowSpacer('right')}`;
        return `${cols}`;
    }

    generateVirtualHeader = ({ columnIndex }) => {
        const { section, sectionFullWidth, scrollBarsSize } = this.props;

        const key = `table-${section}-header-col-${columnIndex}`;
        if (columnIndex > 0) {
            return <div key={key} className="grid__cell_container" style={{ width: `${scrollBarsSize.vertical}px` }} />;
        }
        return <div key={key} style={{ width: sectionFullWidth }} dangerouslySetInnerHTML={{ __html: this.generateHeaderString() }} className="grid__cell_container" />;
    }

    getColumnProps = ({ row, rowIndex, column, height }) => {
        const { expandedRows, renderer, customCellClass } = this.props;

        const expanded = expandedRows[rowIndex] ? 'grid__cell--expanded' : '';
        const columnHeight = expanded ? height - 10 : height;

        const value = getColumnValue(row[column], renderer);
        const title = getColumnTitle(value);
        const classes = `grid__cell grid__row__cell ${expanded} ${customCellClass[column] || ''}`;
        const style = renderer === 'string'
            ? `width: ${this.getColumnWidth(column)}px; height: ${columnHeight}px`
            : { width: `${this.getColumnWidth(column)}px`, height: `${columnHeight}px` };

        return { value, title, classes, style };
    }


    rowToString = ({ row, rowIndex, height }) => {
        const { columns, section } = this.props;

        const cols = columns.map(column => {
            const columnProps = this.getColumnProps({ row, rowIndex, column, height });
            return `<div class="${columnProps.classes}" style="${columnProps.style}" title="${columnProps.title}">${columnProps.value}</div>`;
        }).join('');

        if (section === 'main') return `${this.getRowSpacer('left')}${cols}${this.getRowSpacer('right')}`;
        return `${cols}`;
    };

    rowToJSX = ({ row, rowIndex, height }) => {
        const { columns, section } = this.props;

        const cols = columns.map(column => {
            const columnProps = this.getColumnProps({ row, rowIndex, column, height });
            return <div key={`row-${rowIndex}-col-${column}`} className={columnProps.classes} style={columnProps.style} title={columnProps.title}>{columnProps.value}</div>;
        });

        if (section === 'main')
            return <Fragment>
                {this.getRowSpacer('left')}
                {cols}
                {this.getRowSpacer('right')}
            </Fragment>;
        return cols;
    };

    rowOnDoubleClick = (args) => {
        const { toggleExpandedRow, expandableRow } = this.props;
        if (expandableRow) {
            toggleExpandedRow(args.rowIndex);
        }
    };

    generateVirtualRow = ({ rowIndex, style }) => {
        const { rows, section, calculatedWidths, styles, renderer } = this.props;

        const row = rows[rowIndex];
        const key = `table-${section}-body-row-${row.id || rowIndex}`;
        const zebra = styles.zebra ? rowIndex % 2 === 0 ? '' : 'grid__row__even' : '';
        const rowBorder = styles.rowBorder ? 'grid__row--border' : '';
        const className = `grid__row grid__cell_container ${zebra} ${rowBorder}`;
        const width = section === 'main'
            ? calculatedWidths.left * 2 + calculatedWidths.main + calculatedWidths.right * 2
            : style.width;
        const height = styles.rowBorder ? style.height - 1 : style.height;

        const rowProps = {
            key,
            style: { ...style, width, height },
            className,
            onDoubleClick: () => this.rowOnDoubleClick({ rowIndex, section, entry: row }),
        };

        if (renderer === 'string') {
            return <div {...rowProps}
                dangerouslySetInnerHTML={{ __html: this.rowToString({ row, rowIndex, height }) }}
            />;
        }

        if (renderer === 'jsx') {
            return <div {...rowProps}>
                {this.rowToJSX({ row, rowIndex, height })}
            </div>;
        }

    };

    getContainerStyle = (width) => {
        return {
            width,
            maxWidth: width
        };
    };

    getRowHeight = ({ index }) => {
        const { expandableRow, expandedRows } = this.props;

        let height = DEFAULTS.getDefaultCellHeight();
        if (expandableRow && expandedRows[index]) height = 200;
        return height;
    };

    render() {
        // Data
        const { rows } = this.props;
        // UI
        const { section } = this.props;
        // Sizes
        const { height } = this.props;
        // Scroll
        const { onScrollGrid, scrollTopGrid, sectionWidth, sectionFullWidth, setScrollBarsSize, scrollBarsSize } = this.props;
        // Styles
        const { styles } = this.props;

        const containerStyle = { width: `${sectionWidth}px` };
        if (section === 'right') containerStyle.right = `${scrollBarsSize.vertical}px`;
        const sectionBorder = styles.sectionBorder ? 'grid__row__container--border' : '';

        return <div style={containerStyle} className={`grid__section grid__section__${section}`}>
            <ScrollSync>
                {({ onScroll, scrollLeft }) => {

                    const onBodyScroll = section === 'main'
                        ? (arg) => { onScroll({ ...arg }); onScrollGrid({ ...arg }); }
                        : undefined;

                    const commonProps = {
                        columnCount: 1,
                        columnWidth: sectionFullWidth,
                    };

                    const headerHeight = DEFAULTS.getDefaultCellHeight();
                    const headerWidth = sectionWidth + (section === 'right' ? scrollBarsSize.vertical : 0);

                    return <Fragment>
                        {/* HEADER */}
                        <VirtualizedGrid
                            ref={this.header}
                            { ...commonProps }
                            className="grid__header"
                            scrollLeft={scrollLeft}
                            height={headerHeight}
                            rowHeight={headerHeight}
                            width={headerWidth}
                            rowCount={1}
                            containerStyle={this.getContainerStyle(sectionFullWidth + scrollBarsSize.vertical)}
                            cellRenderer={this.generateVirtualHeader}
                        />
                        {/* BODY */}
                        <VirtualizedGrid
                            ref={this.body}
                            { ...(scrollTopGrid !== undefined ? { scrollTop: scrollTopGrid } : {}) }
                            { ...(setScrollBarsSize !== undefined ? { onScrollbarPresenceChange: setScrollBarsSize } : {}) }
                            { ...commonProps }
                            onScroll={onBodyScroll}
                            className={`grid__row__container grid__row__container__${section} ${sectionBorder}`}
                            height={height - headerHeight /* removing the header */}
                            width={sectionWidth}
                            rowCount={rows.length}
                            rowHeight={this.getRowHeight}
                            containerStyle={this.getContainerStyle(sectionFullWidth)}
                            cellRenderer={this.generateVirtualRow}
                        />
                    </Fragment>;
                }}
            </ScrollSync>
        </div>;
    }
}

GridSection.propTypes = {
    section: PropTypes.oneOf(['main', 'left', 'right']).isRequired,
    onScrollGrid: PropTypes.func,
    scrollTopGrid: PropTypes.number,
    calculatedWidths: PropTypes.object.isRequired,
    sectionWidth: PropTypes.number.isRequired,
    sectionFullWidth: PropTypes.number.isRequired,
    scrollBarsSize: PropTypes.object.isRequired,
    setScrollBarsSize: PropTypes.func,
    expandedRows: PropTypes.object,
    toggleExpandedRow: PropTypes.func,

    columns: PropTypes.array.isRequired,
    columnsLabel: PropTypes.object.isRequired,
    columnsWidth: PropTypes.object,
    sortableColumns: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.array.isRequired,
    height: PropTypes.number,
    styles: PropTypes.shape({
        theme: PropTypes.oneOf(['', 'test']),
        zebra: PropTypes.bool,
        rowBorder: PropTypes.bool,
        sectionBorder: PropTypes.bool,
    }),
    expandableRow: PropTypes.bool,
    customCellClass: PropTypes.object,
    renderer: PropTypes.oneOf(['string', 'jsx']).isRequired,
};

GridSection.defaultProps = {
    sortableColumns: [],
    columnsWidth: {},
    height: 500,
};

function getColumnName(column) {
    return column.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
}

function getColumnValue(rawValue, renderer) {
    if (renderer === 'jsx') return rawValue;

    return rawValue === 0 || rawValue ? rawValue + '' : '';
}

function getColumnTitle(value) {
    if (value === null || value === undefined) return '';
    if (!value.includes) return '';

    if (value.includes('</a>') || value.includes('</div')) {
        return '';
    }
    return value;
}
