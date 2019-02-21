import React from 'react';
import PropTypes from 'prop-types';

export function PageHeader({ children, controls }) {
    return <div className="page-header__container">
        <div className="page-header__header-container">
            <h2 className="page-header">{children}</h2>
        </div>
        <div className="page-header__controls-container">
            {controls && controls}
        </div>
    </div>;
}

PageHeader.propTypes = {
    children: PropTypes.node.isRequired,
    controls: PropTypes.node,
};
