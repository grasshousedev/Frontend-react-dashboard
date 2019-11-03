import React from 'react';
import PropTypes from 'prop-types';


export function Monospace({ children }) {
    return <pre className="ui-text__monospace">{children}</pre>;
}

Monospace.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};
