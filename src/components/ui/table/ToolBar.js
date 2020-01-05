import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { IconControl } from '../Icon';
import { SearchBar } from './SearchBar';
import { Badge } from '../Badge';

const TOOLBAR_CLASS = 'ui-table__toolbar';
const TOOLBAR_CONTAINER_CLASS = `${TOOLBAR_CLASS}__container`;
const TOOLBAR_CONTAINER_OPEN_CLASS = `${TOOLBAR_CONTAINER_CLASS}--open`;
const TOOLBAR_ELEMENTS_CLASS = `${TOOLBAR_CLASS}__elements`;
const TOOLBAR_ELEMENTS_OPEN_CLASS = `${TOOLBAR_ELEMENTS_CLASS}--open`;
const TOOLBAR_CONTROLS_CLASS = `${TOOLBAR_CLASS}__controls`;
const TOOLBAR_CONTROLS_OPEN_CLASS = `${TOOLBAR_CONTROLS_CLASS}--open`;
const TOOLBAR_CONTROL_CLASS = `${TOOLBAR_CONTROLS_CLASS}__control`;


export function ToolBar({ config, columns, tableFilters, setTableFilters }) {
    const [toolbarState, setToolbarState] = useState({ status: 'closed' });

    const containerClass = `${TOOLBAR_CONTAINER_CLASS} ${toolbarState.status === 'open' ? TOOLBAR_CONTAINER_OPEN_CLASS : ''}`;
    const elementsClass = `${TOOLBAR_ELEMENTS_CLASS} ${toolbarState.status === 'open' ? TOOLBAR_ELEMENTS_OPEN_CLASS : ''}`;
    const controlsClass = `${TOOLBAR_CONTROLS_CLASS} ${toolbarState.status === 'open' ? TOOLBAR_CONTROLS_OPEN_CLASS : ''}`;

    const openSearch = () => { setToolbarState({ status: 'open', view: 'search' }); };
    const searchControlClass = `${TOOLBAR_CONTROL_CLASS}`;

    return <div className={containerClass}>
        <div className={elementsClass}>

            {toolbarState.view === 'search' &&
                <SearchBar config={config} columns={columns}
                    tableFilters={tableFilters} setTableFilters={setTableFilters}
                />
            }
        </div>
        <div className={controlsClass}>
            {toolbarState.status === 'open' &&
                <span className={TOOLBAR_CONTROL_CLASS}>
                    <IconControl name="close" onClick={() => { setToolbarState({ status: 'closed' }); }} />
                </span>
            }
            {toolbarState.status === 'closed' && config.searchBar && <Fragment>
                {tableFilters.length > 0 &&
                    <Badge onClick={openSearch}>{tableFilters.length} Filter(s) active</Badge>
                }
                <span className={searchControlClass}>
                    <IconControl name="search" onClick={openSearch} />
                </span>
            </Fragment>}
        </div>
    </div>;
}

ToolBar.propTypes = {
    config: PropTypes.object,
    columns: PropTypes.array,
    tableFilters: PropTypes.array,
    setTableFilters: PropTypes.func.isRequired,
};
