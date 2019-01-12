import React, { Component } from 'react';
import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';


export class Header extends Component {
    render() {
        return <header>
            <DashboardMenu />
        </header>;
    }
}