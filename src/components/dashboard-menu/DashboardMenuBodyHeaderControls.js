import React from 'react';
import PropTypes from 'prop-types';

export function DashboardMenuBodyHeaderControls({ toggleBodyOpen, floating = false }) {
    const extraClassName = floating ? 'dashboard-menu__body-controls--floating' : '';
    return <div className={`dashboard-menu__body-controls ${extraClassName}`}>
        <i className="fas fa-times dashboard-menu__body-controls__control" onClick={() => toggleBodyOpen(false)}></i>
    </div>;
}

DashboardMenuBodyHeaderControls.propTypes = {
    toggleBodyOpen: PropTypes.func.isRequired,
    floating: PropTypes.bool,
};
DashboardMenuBodyHeaderControls.defaultProps = {
    floating: false,
};
