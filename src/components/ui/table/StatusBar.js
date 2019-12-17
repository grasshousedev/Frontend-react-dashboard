import React from 'react';
import PropTypes from 'prop-types';

import { getStatusBarClass } from './stylesAndClasses/statusBar';


export function StatusBar({ config, pageState, entries }) {
    const totEntries = entries.length;
    const firstEntry = (pageState.page - 1) * pageState.pageSize + 1;
    const lastEntry = Math.min(totEntries, firstEntry + pageState.pageSize - 1);

    const statusBarClass = getStatusBarClass();

    return <div className={statusBarClass}>
        {config.pagination && <span>
            Showing {firstEntry} to {lastEntry} entries ({totEntries} total)
        </span>}
        {!config.pagination && <span>
            Showing {totEntries} entries
        </span>}
    </div>;
}

StatusBar.propTypes = {
    config: PropTypes.object.isRequired,
    pageState: PropTypes.object.isRequired,
    entries: PropTypes.array.isRequired,
};
