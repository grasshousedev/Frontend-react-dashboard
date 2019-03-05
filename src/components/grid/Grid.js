import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollSync } from 'react-virtualized';

import { DEFAULTS } from './constants';
import { calculateColumnWidth, getScrollSize } from './utils';

import { GridSection} from './GridSection';
import './grid.scss';

export class Grid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns,
            pinnedColumns: {
                left: props.pinnedColumns.left || [],
                right: props.pinnedColumns.right || [],
            },
            expandedRows: {},
            scrollBarsSize: { horizontal: 0, vertical: 0 },
            outerContainerWidth: null,
        };

        this.outerContainer = React.createRef();
        this.leftGridSection = React.createRef();
        this.mainGridSection = React.createRef();
        this.rightGridSection = React.createRef();
    }

    componentDidMount() {
        this.updateContainerSize();
        window.addEventListener('resize', this.updateContainerSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateContainerSize);
    }

    updateContainerSize = () => {
        this.setState({ outerContainerWidth: this.outerContainer.current.clientWidth });
    }

    componentDidUpdate(prevProps) {
        const { pinnedColumns } = this.props;

        let newState = undefined;

        if (prevProps.pinnedColumns !== pinnedColumns) {
            newState = newState || {};
            newState.pinnedColumns = {
                left: pinnedColumns.left || [],
                right: pinnedColumns.right || [],
            };
        }

        if (newState) {
            this.setState(newState);
        }
    }

    setScrollBarsSize = (scrollBars) => {
        this.setState({
            scrollBarsSize: {
                horizontal: scrollBars.horizontal ? getScrollSize() : 0,
                vertical: scrollBars.vertical ? getScrollSize() : 0,
            }
        });
    }

    calculateColumnsWidth = (columnsList) => {
        const { columnsWidth, sortableColumns } = this.props;

        return columnsList.reduce(
            (tot, column) => tot +
                calculateColumnWidth(column, { columnsWidth, sortableColumns }) + DEFAULTS.CELL.PADDING_SIDE * 2,
            0
        );
    }

    calculateWidths = (generatedColumns) => {
        const left = this.calculateColumnsWidth(generatedColumns.left);
        const right = this.calculateColumnsWidth(generatedColumns.right);
        const main = this.calculateColumnsWidth(generatedColumns.main);
        return { left, right, main };
    }

    generateColumns = () => {
        const { columns, pinnedColumns } = this.state;

        const left = pinnedColumns.left;
        const right = pinnedColumns.right;
        return {
            left,
            right,
            main: columns.filter(column => !left.includes(column) && !right.includes(column))
        };
    }

    redrawGrids = () => {
        this.leftGridSection && this.leftGridSection.current && this.leftGridSection.current.body.current.recomputeGridSize();
        this.mainGridSection && this.mainGridSection.current && this.mainGridSection.current.body.current.recomputeGridSize();
        this.rightGridSection && this.rightGridSection.current && this.rightGridSection.current.body.current.recomputeGridSize();
    }

    toggleExpandedRow = (index) => {
        const { expandedRows } = this.state;

        if (expandedRows[index])
            delete expandedRows[index];
        else
            expandedRows[index] = 1;
        this.setState(
            () => { return { expandedRows }; },
            () => { this.redrawGrids(); }
        );
    }

    render() {
        const { columnsLabel, rows, columnsWidth } = this.props;
        const { height, autoHeightRows, width } = this.props;
        const { expandableRow } = this.props;
        const { styles, renderer } = this.props;

        const { scrollBarsSize, expandedRows, outerContainerWidth } = this.state;

        const gridHeight = autoHeightRows
            ? Math.max(DEFAULTS.getDefaultCellHeight() * Math.min(4, rows.length, autoHeightRows + 1), height)
            : height;

        const containerMaxWidth = this.outerContainer && this.outerContainer.current && outerContainerWidth
            ? outerContainerWidth
            : width ? width : window.innerWidth;

        const generatedColumns = this.generateColumns();
        const calculatedWidths = this.calculateWidths(generatedColumns);
        const totalWidth = calculatedWidths.left + calculatedWidths.main + calculatedWidths.right + scrollBarsSize.vertical * 2;

        const containerWidth = width ? Math.min(width, containerMaxWidth, totalWidth) : Math.min(containerMaxWidth, totalWidth);

        return <div ref={this.outerContainer}>
            <ScrollSync>
                {({ onScroll, scrollTop }) => {
                    const theme = styles.theme ? `grid__${styles.theme}` : '';

                    const commonProps = {
                        rows,
                        columnsLabel,
                        columnsWidth,
                        calculatedWidths,
                        scrollBarsSize,
                        expandedRows,
                        expandableRow,
                        styles,
                        renderer,
                    };

                    const leftProps = {
                        section: 'left',
                        scrollTopGrid: scrollTop,
                        columns: generatedColumns.left,
                        height: gridHeight - scrollBarsSize.horizontal,
                        sectionWidth: calculatedWidths.left,
                        sectionFullWidth: calculatedWidths.left,
                    };

                    const mainProps = {
                        section: 'main',
                        onScrollGrid: onScroll,
                        columns: generatedColumns.main,
                        height: gridHeight,
                        sectionWidth: containerWidth,
                        sectionFullWidth: totalWidth - scrollBarsSize.vertical,
                    };

                    const rightProps = {
                        section: 'right',
                        scrollTopGrid: scrollTop,
                        columns: generatedColumns.right,
                        height: gridHeight - scrollBarsSize.horizontal,
                        sectionWidth: calculatedWidths.right,
                        sectionFullWidth: calculatedWidths.right,
                    };

                    return <div
                        className={`grid__container ${theme}`}
                        style={{ height: `${gridHeight}px`, width: `${containerWidth}px`}}
                    >
                        {generatedColumns.left.length > 0 && <GridSection
                            ref={this.leftGridSection}
                            { ...commonProps }
                            { ...leftProps }
                            toggleExpandedRow={this.toggleExpandedRow}
                        />}
                        <GridSection
                            ref={this.mainGridSection}
                            { ...commonProps }
                            { ...mainProps }
                            setScrollBarsSize={this.setScrollBarsSize}
                            toggleExpandedRow={this.toggleExpandedRow}
                        />
                        {generatedColumns.right.length > 0 && <GridSection
                            ref={this.rightGridSection}
                            { ...commonProps }
                            { ...rightProps }
                            toggleExpandedRow={this.toggleExpandedRow}
                        />}

                    </div>;
                }}
            </ScrollSync>
        </div>;
    }
}

Grid.propTypes = {
    columns: PropTypes.array.isRequired,
    pinnedColumns: PropTypes.shape({
        left: PropTypes.array,
        right: PropTypes.array,
    }),
    columnsLabel: PropTypes.object.isRequired,
    columnsWidth: PropTypes.object,
    sortableColumns: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.array.isRequired,
    height: PropTypes.number,
    autoHeightRows: PropTypes.number,
    width: PropTypes.number,
    styles: PropTypes.shape({
        theme: PropTypes.oneOf(['', 'test']),
        zebra: PropTypes.bool,
        rowBorder: PropTypes.bool,
        sectionBorder: PropTypes.bool,
    }),
    expandableRow: PropTypes.bool,
    renderer: PropTypes.oneOf(['string', 'jsx']),
};

Grid.defaultProps = {
    height: 500,
    sortableColumns: [],
    columnsWidth: {},
    pinnedColumns: { left: [], right: [] },
    styles: {
        theme: '',
        zebra: true,
        rowBorder: false,
        sectionBorder: true,
    },
    expandableRow: true,
    renderer: 'string',
};