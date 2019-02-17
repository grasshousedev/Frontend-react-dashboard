import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';
import { DashboardItem } from 'components/dashboard-menu/DashboardItem';
import './header.scss';

import { Login } from 'components/authentication/Login';
import { generateTags, hasTag } from './headerUtils';

class Applications extends DashboardItem {
    applications = [
        {
            name: 'Machine Learning',
            tags: generateTags('Machine Learning'),
            icon: <i className="fas fa-cogs"></i>,
            link: '/machine-learning'
        }
    ]
    
    render() {
        const { query } = this.props;

        return <div className="applications-container">
            {this.applications.map(application => {
                if (hasTag(application.tags, query)) {
                    return <Link
                        to={application.link}
                        className="applications__application"
                        key={application.name}
                    >
                        <div className="applications__application__icon">
                            {application.icon}
                        </div>
                        <div className="applications__application__name">
                            {application.name}
                        </div>
                    </Link>;
                }
                return <Fragment key={application.name} />;
            })}
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
                center={<Link to="/">Dashboard</Link>}
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
