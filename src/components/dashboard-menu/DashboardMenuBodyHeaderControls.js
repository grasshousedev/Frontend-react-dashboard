import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/ui/Icon';


export function DashboardMenuBodyHeaderControls({ toggleBodyOpen, floating = false }) {
    const extraClassName = floating ? 'dashboard-menu__body-controls--floating' : '';
    return <div className={`dashboard-menu__body-controls ${extraClassName}`}>
        <Icon name="close" size="small" className="dashboard-menu__body-controls__control" onClick={() => toggleBodyOpen(false)} />
    </div>;
}

DashboardMenuBodyHeaderControls.propTypes = {
    toggleBodyOpen: PropTypes.func.isRequired,
    floating: PropTypes.bool,
};
DashboardMenuBodyHeaderControls.defaultProps = {
    floating: false,
};
