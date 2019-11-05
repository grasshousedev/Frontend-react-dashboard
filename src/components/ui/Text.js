import React from 'react';
import PropTypes from 'prop-types';


export function Monospace({ children }) {
    return <span className="ui-text__monospace">{children}</span>;
}

Monospace.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};
