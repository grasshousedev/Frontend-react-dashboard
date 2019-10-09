import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'components/table/Table';

export function PropsTable({ propsList, title='Props', widths }) {
    const columns = [
        { prop: 'propName', title: 'Name', width: widths && widths.propName ? widths.propName : 200, },
        { prop: 'propType', title: 'Type', width: widths && widths.propType ? widths.propType : 100, },
        { prop: 'isRequired', title: 'Req.', width: widths && widths.isRequired ? widths.isRequired : 40, },
        { prop: 'default', title: 'Default', width: widths && widths.isRequired ? widths.isRequired : 150, },
        { prop: 'description', title: 'Description', },
    ];

    const entries = propsList.map(prop => {
        return {
            ...prop,
            default: typeof prop.default !== 'object' ? <pre className="ui-text__monospace">{prop.default}</pre> : prop.default,
            isRequired: prop.isRequired ? <i className="fa fa-check" /> : '',
        };
    });

    const config = {
        verticalAlignment: 'top',
        headerController: false,
    };

    return <div>
        <h2>{title}</h2>
        <Table columns={columns} entries={entries} config={config} />
    </div>;
}

PropsTable.propTypes = {
    propsList: PropTypes.array.isRequired,
    title: PropTypes.string,
    widths: PropTypes.object,
};
