import React from 'react';
import PropTypes from 'prop-types';

export function Panel({ children }) {
    return <div className="ui-panel">
        {children}
    </div>;
}

Panel.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ])
};

