import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';
import { DashboardItem } from 'components/dashboard-menu/DashboardItem';
import './header.scss';

import { Login } from 'components/authentication/Login';

class Applications extends DashboardItem {
    
    render() {
        const { query } = this.props;

        return <div className="applications-container">
            This will be the list of installed applications! Query: {query}
        </div>;
    }

}

class User extends DashboardItem {
    render() {
        return <Login />;
    }
}

class Header extends Component {
    render() {
        const { authentication } = this.props;

        const userLabel = authentication.user ? `Welcome ${authentication.user.first_name}!` : 'Login';
        return <header>
            <DashboardMenu
                left={[
                    { headerLabel: 'Applications', bodyItem: Applications, name: 'applications' },
                ]}
                center='Dashboard'
                right={[
                    { headerLabel: userLabel, bodyItem: User, name: 'user' }
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
