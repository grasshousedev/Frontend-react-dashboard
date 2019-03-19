import React from 'react';
import PropTypes from 'prop-types';

import { withAuthentication } from 'libs/authentication/storeConnection';
import { Header } from './scaffold/Header/Header';
import { Routes } from 'routes/Routes';
import { Login } from 'components/authentication/Login';
import { DashboardLogin } from 'components/authentication/DashboardLogin';
import { Footer } from 'scaffold/Footer/Footer';


function Dashboard({ authentication }) {
    if (!authentication.storageLoginAttempt)
        return <div className="ui-loader__preloader__container">
            <div className="ui-preloader__loader ui-loader ui-loader--large" />
        </div>;

    if (!authentication.loggedIn)
        return <div className="dashboard__full-screen__login__container">
            <div className="dashboard__full-screen__login__form">
                <Login loginComponent={DashboardLogin} />
            </div>
        </div>;

    return <div>
        <Header />
        <div className="dashboard-content">
            <Routes />
        </div>
        <Footer />
    </div>;
}
Dashboard.propTypes = {
    authentication: PropTypes.object,
};

const connectedDashboard = withAuthentication(Dashboard);
export { connectedDashboard as Dashboard };