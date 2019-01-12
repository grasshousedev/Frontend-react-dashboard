import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './dashboard-menu.scss';

export class DashboardMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyStatus: {
                open: false,
            }
        };
    }

    toggleBodyOpen = (forcedStatus) => {
        const { bodyStatus } = this.state;
        const newOpenStatus = forcedStatus !== undefined
            ? forcedStatus
            : bodyStatus.open ? false : true;
        this.setState({ bodyStatus: {...bodyStatus, open: newOpenStatus } });
    }

    render() {
        const { left, center, right } = this.props;
        const { bodyStatus } = this.state;

        return <div className="dashboard-menu__container">
            <div className="dashboard-menu__header" onClick={() => this.toggleBodyOpen()}>
                <div className="dashboard-menu__header-block">
                    {left && left}
                    {!left &&
                        <span className="dashboard-menu__header-item">Menu Item 1 (<i>left prop</i>)</span>
                    }
                </div>
                <div className="dashboard-menu__header-block">
                    <span className="dashboard-menu__header-item">
                        {center && center}
                        {!center &&
                            <Fragment>~ Click me to toggle the body ~ (override with <i>center prop</i>)</Fragment>
                        }
                    </span>
                </div>
                <div className="dashboard-menu__header-block">
                    {right && right}
                    {!right &&
                        <span className="dashboard-menu__header-item">Hello user! (<em>right prop</em>)</span>
                    }
                </div>                
            </div>
            {bodyStatus.open &&
                <div className="dashboard-menu__body">
                    This is the body of the menu, will include useful links to any application part!
                </div>
            }
        </div>;
    }
};

DashboardMenu.propTypes = {
    left: PropTypes.oneOf([PropTypes.element, PropTypes.string]),
    center: PropTypes.oneOf([PropTypes.element, PropTypes.string]),
    right: PropTypes.oneOf([PropTypes.element, PropTypes.string]),
};
