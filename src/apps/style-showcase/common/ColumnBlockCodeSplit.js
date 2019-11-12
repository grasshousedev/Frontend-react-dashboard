import React from 'react';

import { ColumnBlock } from 'components/ui/Blocks';
import { propTypeChildren } from 'components/utils';


export function ColumnBlockCodeSplit({ children }) {
    return <ColumnBlock className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
        {children}
    </ColumnBlock>;
}

ColumnBlockCodeSplit.propTypes = {
    children: propTypeChildren,
};
