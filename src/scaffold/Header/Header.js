import React, { Component } from 'react';
import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';
import { DashboardItem } from 'components/dashboard-menu/DashboardItem';
import './header.scss';

const RightComponent = () => {
    return <span>Hello User!</span>;
};

class Applications extends DashboardItem {
    
    render() {
        const { query } = this.props;

        return <div className="applications-container">
            This will be the list of installed applications! Query: {query}
        </div>;
    }

}

export class Header extends Component {
    render() {
        return <header>
            <DashboardMenu
                left={[{ headerLabel: 'Applications', bodyItem: Applications, name: 'applications' }, 'Menu Item 2']}
                center='Dashboard'
                right={<RightComponent />}
            />
        </header>;
    }
}
