import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DashboardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showQueryBar: true,
            showQueryPrefix: true,
        };
    }

    render() {
        return <div>This render should be overridden!</div>;
    }
}

DashboardItem.propTypes = {
    query: PropTypes.string,
};