import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Select, Input } from '../form';
import { Button } from '../Button';
import { Icon } from '../Icon';

import { SEARCH_FILTER_OPERATORS } from './constants';

const SEARCH_BAR_CLASS = 'ui-table__search-bar';
const SEARCH_BAR_CONTAINER_CLASS = `${SEARCH_BAR_CLASS}__container`;
const SEARCH_BAR_SEARCH_FIELD_CLASS = `${SEARCH_BAR_CLASS}__search-field`;


export function SearchBar({ config, columns, tableFilters, setTableFilters }) {
    const [newFilter, setNewFilter] = useState({});

    const { fields, fields_map } = config.searchConfig;
    const newFilterOperators = newFilter.field
        ? SEARCH_FILTER_OPERATORS[fields_map[newFilter.field].operator_type]
        : SEARCH_FILTER_OPERATORS.string;

    return <div className={SEARCH_BAR_CONTAINER_CLASS}>
        <div className={SEARCH_BAR_SEARCH_FIELD_CLASS}>
            Select field:
            <span className="w-200 m-l-10">
                <Select options={fields}
                    value={newFilter.field}
                    onChange={f => setNewFilter({ field: f.value })} />
            </span>
            <span className="w-100 m-l-10">
                <Select options={newFilterOperators}
                    value={newFilter.operator}
                    onChange={f => setNewFilter({ ...newFilter, operator: f.value })} />
            </span>
            <span className="w-200 m-l-10">
                <Input value={newFilter.value || ''}
                    onChange={e => setNewFilter({ ...newFilter, value: e.target.value })} />
            </span>
            {newFilter.field && newFilter.operator && newFilter.value &&
                <Button classes={['small', 'primary']} onClick={() => {
                    setTableFilters([...tableFilters, newFilter]);
                    setNewFilter({});
                }}>
                    <Icon size="smaller" name="add" />
                </Button>
            }
        </div>
    </div>;
}

SearchBar.propTypes = {
    config: PropTypes.object,
    columns: PropTypes.array,
    tableFilters: PropTypes.array,
    setTableFilters: PropTypes.func.isRequired,
};