import React from 'react';
import PropTypes from 'prop-types';

import { propTypeChildren } from 'components/utils';

const UI_TILES_CLASS = 'ui-tiles';
const UI_TILES_TILE_CLASS = `${UI_TILES_CLASS}__tile`;
const UI_TILES_TILE_ICON_CLASS = `${UI_TILES_TILE_CLASS}__icon`;
const UI_TILES_TILE_LABEL_CLASS = `${UI_TILES_TILE_CLASS}__label`;


export function Tile ({ icon, label, withBackground=false, ...rest }) {
    const withBackgroundClass = withBackground ? `${UI_TILES_TILE_CLASS}--with-background` : '';
    const tileClass = `${UI_TILES_TILE_CLASS} ${withBackgroundClass}`;

    return <div className={tileClass} {...rest}>
        <div className={UI_TILES_TILE_ICON_CLASS}>{icon}</div>
        <div className={UI_TILES_TILE_LABEL_CLASS}>{label}</div>
    </div>;
}

Tile.propTypes = {
    icon: propTypeChildren.isRequired,
    label: propTypeChildren.isRequired,
    withBackground: PropTypes.bool,
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