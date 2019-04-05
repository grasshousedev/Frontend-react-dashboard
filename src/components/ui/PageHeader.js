import React from 'react';
import PropTypes from 'prop-types';

export function PageHeader({ children, controls }) {
    return <div className="ui-page-header__container">
        <div className="ui-page-header__header-container">
            <h2 className="ui-page-header">{children}</h2>
        </div>
        <div className="ui-page-header__controls-container">
            {controls && controls}
        </div>
    </div>;
}

PageHeader.propTypes = {
    children: PropTypes.node.isRequired,
    controls: PropTypes.node,
};
