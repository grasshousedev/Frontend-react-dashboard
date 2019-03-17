import React from 'react';
import PropTypes from 'prop-types';

import { withAuthentication } from 'libs/authentication/storeConnection';
import { Header } from './scaffold/Header/Header';
import { Routes } from 'routes/Routes';


function Dashboard({ authentication }) {
    if (!authentication.storageLoginAttempt)
        return <div></div>;
        
    return <div>
        <Header />
        <div className="dashboard-content">
            <Routes />
        </div>
    </div>;
}
Dashboard.propTypes = {
    authentication: PropTypes.object,
};

const connectedDashboard = withAuthentication(Dashboard);
export { connectedDashboard as Dashboard };