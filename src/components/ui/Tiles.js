import React from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';

export function Tile ({ icon, label, ...rest }) {
    return <div className="ui-tiles__tile" {...rest}>
        <div className="ui-tiles__tile__icon">{icon}</div>
        <div className="ui-tiles__tile__label">{label}</div>
    </div>;
}

Tile.propTypes = {
    icon: propTypeChildren.isRequired,
    label: propTypeChildren.isRequired,
};


function Container({ children, small, ...rest }) {
    const smallClass = small ? 'ui-tiles--small' : '';
    const containerClass = `ui-tiles__container ${smallClass}`;
    return <div className={containerClass} {...rest}>
        {children}
    </div>;
}

Container.propTypes = {
    children: propTypeChildren,
    small: PropTypes.bool,
};

export const Tiles = { Container, Tile };