import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon } from 'components/ui/Icon';
import { SidebarContext } from 'components/ui/Sidebar';

import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';

import { ConnectedApplications } from './HeaderComponents/Applications';
import { ConnectedUser } from './HeaderComponents/User';

function Header ({ authentication }) {
    const [sidebarState, setSidebarState] = useContext(SidebarContext);

    const userLabel = authentication.user ? `Welcome ${authentication.user.first_name}!` : 'Login';

    const SidebarTrigger = <span style={{ padding: '0 11px' }}
        className="dashboard-menu__header-item dashboard-menu__header-dashboard-item"
        onClick={() => {
            setSidebarState({ ...sidebarState, status: sidebarState.status === 'open' ? 'closed' : 'open' });
        }}
    >
        {sidebarState.status === 'open' ? <Icon name="close" /> : <Icon name="menu" />}
    </span>;

    return <header className="ui-dashboard-header">
        <DashboardMenu
            left={[
                SidebarTrigger,
                { headerLabel: 'Applications', bodyItem: ConnectedApplications, name: 'applications' },
            ]}
            right={[
                { headerLabel: userLabel, bodyItem: ConnectedUser, name: 'user', showQueryInput: false, floatingControls: true }
            ]}
        />
    </header>;
}

Header.propTypes = {
    authentication: PropTypes.object,
};

function mapStateToProps(state) {
    const { authentication } = state;

    return {
        authentication
    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };
