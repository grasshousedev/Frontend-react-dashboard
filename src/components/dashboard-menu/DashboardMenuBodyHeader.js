import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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
        const { query, handleChangeQuery, toggleBodyOpen, showQueryInput } = this.props;

        return <div className="dashboard-menu__body-header">
            <div className="dashboard-menu__body-query">
                {showQueryInput && <Fragment>
                    <input ref={this.queryInputRef}
                        type="text" value={query} placeholder="Type your query here..."
                        className="dashboard-menu__body-query__input"
                        onChange={handleChangeQuery} />
                    <i className="dashboard-menu__body-header__icon dashboard-menu__body-header__icon-search fas fa-search" />
                </Fragment>}
            </div>
            <div className="dashboard-menu__body-controls">
                <i className="fas fa-times dashboard-menu__body-controls__control" onClick={() => toggleBodyOpen(false)}></i>
            </div>
        </div>;
    }
};

DashboardMenuBodyHeader.propTypes = {
    handleChangeQuery: PropTypes.func.isRequired,
    toggleBodyOpen: PropTypes.func.isRequired,
    query: PropTypes.string,
    showQueryInput: PropTypes.bool,
};
DashboardMenuBodyHeader.defaultProps = {
    showQueryInput: true,
};

