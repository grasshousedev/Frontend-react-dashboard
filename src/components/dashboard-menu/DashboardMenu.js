import React, { Component } from 'react';
import './dashboard-menu.scss';
import { STATUS } from './constants';

export class DashboardMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: STATUS.CLOSED
        }
    }

    toggleStatus = () => {
        const { status } = this.state;
        this.setState({ status: status === STATUS.OPEN ? STATUS.CLOSED : STATUS.OPEN });
    }

    render() {
        const { status } = this.state;

        return <div className="dashboard-menu__container">
            <div className="dashboard-menu__header" onClick={() => this.toggleStatus()}>
                <div className="dashboard-menu__header-block">
                    <span className="dashboard-menu__header-item">Menu Item 1</span>
                    <span className="dashboard-menu__header-item">Menu Item 2</span>
                </div>
                <div className="dashboard-menu__header-block">
                    <span className="dashboard-menu__header-item">
                        Menu items will go here.  ~ Click me to toggle the body ~
                    </span>
                </div>
                <div className="dashboard-menu__header-block">
                    <span className="dashboard-menu__header-item">Hello user!</span>
                </div>                
            </div>
            {status === STATUS.OPEN &&
                <div className="dashboard-menu__body">
                    This is the body of the menu, will include useful links to any application part!
                </div>
            }
        </div>;
    }
}