import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'components/ui/table/Table';
import { Block } from 'components/ui/Blocks';
import { Icon } from 'components/ui/Icon';
import { Monospace } from 'components/ui/Text';

export function PropsTable({ propsList, title='', widths }) {
    const blockRef = useRef(null);

    const columns = [
        { prop: 'propName', title: 'Name', width: widths && widths.propName ? widths.propName : 200, },
        { prop: 'propType', title: 'Type', width: widths && widths.propType ? widths.propType : 100, },
        { prop: 'isRequired', title: 'Req.', width: widths && widths.isRequired ? widths.isRequired : 40, },
        { prop: 'default', title: 'Default', width: widths && widths.default ? widths.default : 150, },
        { prop: 'description', title: 'Description', },
    ];

    const entries = propsList.map(prop => {
        return {
            ...prop,
            propType: renderAttribute(prop, 'propType'),
            default: renderAttribute(prop, 'default'),
            isRequired: prop.isRequired ? <Icon name="check" /> : '',
        };
    });

    const config = {
        verticalAlignment: 'top',
        headerController: false,
    };

    return <Block title={title} blockRef={blockRef}>
        <Table columns={columns} entries={entries} config={config} container={blockRef} />
    </Block>;
}

PropsTable.propTypes = {
    propsList: PropTypes.array.isRequired,
    title: PropTypes.string,
    widths: PropTypes.object,
};

function renderAttribute(prop, attribute) {
    return typeof prop[attribute] === 'string'
    ? <Monospace>{prop[attribute]}</Monospace>
    : prop[attribute] && prop[attribute].map
        ? prop[attribute].map(p => <Monospace key={p}>{p}</Monospace>)
        : prop[attribute]
    ;
}