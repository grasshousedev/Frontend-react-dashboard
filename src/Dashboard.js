import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { withAuthentication } from 'libs/authentication/storeConnection';
import { Header } from './scaffold/Header/Header';
import { Routes } from 'routes/Routes';
import { Login } from 'components/authentication/Login';
import { DashboardLogin } from 'components/authentication/DashboardLogin';
import { Icon } from 'components/ui/Icon';
import { FullSectionLoader } from 'components/ui/Loader';
import { Sidebar, SidebarContext } from 'components/ui/Sidebar';


function Dashboard({ authentication }) {
    const { pathname } = useLocation();

    useEffect(() => {
        const DASHBOARD_CLASS = 'dashboard__dashboard-view';
        if (pathname === "" || pathname === "/") {
            document.body.classList.add(DASHBOARD_CLASS);
        } else {
            if (document.body.classList.contains(DASHBOARD_CLASS)) {
                document.body.classList.remove(DASHBOARD_CLASS);
            }
        }
    }, [pathname]);

    if (!authentication.storageLoginAttempt)
        return <div style={{ height: '100vh' }}><FullSectionLoader /></div>;

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
                    className="dashboard__sidebar"
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
