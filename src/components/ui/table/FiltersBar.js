import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';

import { SEARCH_OPERATORS } from './constants';

const FILTERS_BAR_CLASS = 'ui-table__filters-bar';
const FILTERS_BAR_PILLS_CLASS = `${FILTERS_BAR_CLASS}__pills`;
const FILTERS_BAR_PILLS_PILL_CLASS = `${FILTERS_BAR_PILLS_CLASS}__pill`;


export function FiltersBar({ config, tableFilters, setTableFilters }) {
    if (tableFilters.length === 0) return null;

    const { fields_map } = config.searchConfig;

    return <div className={FILTERS_BAR_PILLS_CLASS}>
        <span className="m-r-10">Filters:</span>
        {tableFilters.map((filter, index) => {
            return <div key={index} className={FILTERS_BAR_PILLS_PILL_CLASS}>
                {fields_map[filter.field].label} {SEARCH_OPERATORS[filter.operator].label} {filter.value}
                <Icon size="smaller" name="clear" className="m-l-5" onClick={() => {
                    setTableFilters(tableFilters.filter((_, fi) => fi !== index));
                }} />
            </div>;
        })}
    </div>;
}

FiltersBar.propTypes = {
    config: PropTypes.shape({
        searchConfig: PropTypes.object,
    }).isRequired,
    tableFilters: PropTypes.array.isRequired,
    setTableFilters: PropTypes.func.isRequired,
};
