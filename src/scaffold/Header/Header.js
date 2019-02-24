import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

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
        },
        {
            name: 'Styles Showcase',
            tags: generateTags('Styles Showcase'),
            icon: <i className="fas fa-palette"></i>,
            link: '/style-showcase'
        }
    ]
    
    navigate = (path) => {
        const { history, resetDashboardMenu } = this.props;
        
        history.push(path);
        resetDashboardMenu();
    }

    render() {
        const { query } = this.props;

        return <div className="applications-container">
            {this.applications.map(application => {
                if (hasTag(application.tags, query)) {
                    return <span                        
                        className="applications__application"
                        key={application.name}
                        onClick={() => this.navigate(application.link)}
                    >
                        <div className="applications__application__icon">
                            {application.icon}
                        </div>
                        <div className="applications__application__name">
                            {application.name}
                        </div>
                    </span>;
                }
                return <Fragment key={application.name} />;
            })}
        </div>;
    }

}

Applications.propTypes = {
    query: PropTypes.string,
    resetDashboardMenu: PropTypes.func,
    history: PropTypes.object,
};

const ApplicationsRouter = withRouter(Applications);

class User extends DashboardItem {
    render() {
        return <Login />;
    }
}

class Header extends Component {

    render() {
        const { authentication } = this.props;

        const userLabel = authentication.user ? `Welcome ${authentication.user.first_name}!` : 'Login';
        return <header className="dashboard-header">
            <DashboardMenu
                left={[
                    { headerLabel: 'Applications', bodyItem: ApplicationsRouter, name: 'applications' },
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
