import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';

import { ConnectedApplications } from './HeaderComponents/Applications';
import { ConnectedUser } from './HeaderComponents/User';

class Header extends Component {

    render() {
        const { authentication } = this.props;

        const userLabel = authentication.user ? `Welcome ${authentication.user.first_name}!` : 'Login';
        return <header className="ui-dashboard-header">
            <DashboardMenu
                left={[
                    { headerLabel: 'Applications', bodyItem: ConnectedApplications, name: 'applications' },
                ]}
                center={<Link className="dashboard-menu__header__link" to="/">Dashboard</Link>}
                right={[
                    { headerLabel: userLabel, bodyItem: ConnectedUser, name: 'user', showQueryInput: false, floatingControls: true }
                ]}
            />
        </header>;
    }
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
