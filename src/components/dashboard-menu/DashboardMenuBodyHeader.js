import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DashboardMenuBodyHeaderControls } from './DashboardMenuBodyHeaderControls';

export class DashboardMenuBodyHeader extends Component {
    constructor(props) {
        super(props);

        this.queryInputRef = React.createRef();
    }

    componentDidMount() {
        this.focusQueryInput();
    }

    componentDidUpdate() {
        this.focusQueryInput();
    }

    focusQueryInput = () => {
        setTimeout(() => {
            this.queryInputRef.current && this.queryInputRef.current.focus();
        }, 5);            
    }

    render() {
        const { query, handleChangeQuery, toggleBodyOpen, showQueryInput, floatingControls } = this.props;

        return <div className="dashboard-menu__body-header">
            {showQueryInput && 
                <div className="dashboard-menu__body-query">                
                    <input ref={this.queryInputRef}
                        type="text" value={query} placeholder="Type your query here..."
                        className="dashboard-menu__body-query__input"
                        onChange={handleChangeQuery} />
                    <i className="dashboard-menu__body-header__icon dashboard-menu__body-header__icon-search fas fa-search" />
                </div>
            }
            <DashboardMenuBodyHeaderControls toggleBodyOpen={toggleBodyOpen} floating={floatingControls} />
        </div>;
    }
};

DashboardMenuBodyHeader.propTypes = {
    handleChangeQuery: PropTypes.func.isRequired,
    toggleBodyOpen: PropTypes.func.isRequired,
    query: PropTypes.string,
    showQueryInput: PropTypes.bool,
    floatingControls: PropTypes.bool,
};
DashboardMenuBodyHeader.defaultProps = {
    showQueryInput: true,
    floatingControls: false,
};

