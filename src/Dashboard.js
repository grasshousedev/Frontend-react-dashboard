import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


import { withAuthentication } from 'libs/authentication/storeConnection';
import { Header } from './scaffold/Header/Header';
import { Routes } from 'routes/Routes';
import { Login } from 'components/authentication/Login';
import { DashboardLogin } from 'components/authentication/DashboardLogin';
import { Icon } from 'components/ui/Icon';
import { Sidebar, SidebarContext } from 'components/ui/Sidebar';


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

    return <Fragment>
        <Sidebar.Provider>
            <Header />
            <div style={{ display: 'flex' }}>
                <Sidebar disableTrigger={true}
                    height={'calc(100vh - 46px)'}
                    top={(sidebarState) => <SidebarContent sidebarState={sidebarState} />}
                    bottom={(sidebarState) => <Icon name="person" size="big" />}
                    sidebarContext={SidebarContext}
                >                        
                </Sidebar>
                <div className="dashboard-content" style={{ display: 'inline-block', flexGrow: 1 }}>
                    <Routes />
                </div>
            </div>
        </Sidebar.Provider>
    </Fragment>;
}

Dashboard.propTypes = {
    authentication: PropTypes.object,
};

const connectedDashboard = withAuthentication(Dashboard);
export { connectedDashboard as Dashboard };


function SidebarContent({ sidebarState }) {
    return <Fragment>
        <Sidebar.Entry sidebarState={sidebarState} iconName="dashboard" link="/">
            Dashboard
        </Sidebar.Entry>
        <Sidebar.Entry sidebarState={sidebarState} iconName="palette" link="/style-showcase" id="sidebar-style-showcase">
            Style Showcase
        </Sidebar.Entry>
    </Fragment>;
}

SidebarContent.propTypes = {
    sidebarState: PropTypes.object.isRequired,
};
